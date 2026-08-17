import * as assert from 'assert';
import {
  ERROR_GENOME_BUILD_MIX,
  ERROR_GENOME_BUILD_NOT_DETECTED,
  ERROR_GENOME_BUILD_NOT_ENOUGH,
  WARN_ALLELES_STRAND_FLIPPED,
} from '../src/raw.errors';
import {EVENTS, RawFormatNormalizerTransform} from '../src/raw.normalizer';
import {ValidationInfo} from '../src/raw.models';
import {
  checkBuildForSnp,
  chrposB37,
  chrposB38,
} from '../src/utils/genome-build';

const COMPLEMENT: {[key: string]: string} = {A: 'T', T: 'A', C: 'G', G: 'C'};

interface TableEntry {
  chr: string;
  position: number;
  ref: string;
  alt: string;
}

/**
 * Takes the first `count` usable entries of one of the reference tables.
 * Only biallelic ACGT entries are usable, and entries whose allele pair is
 * symmetric under complement (A/T, C/G) would be undetectable by design, so
 * they are skipped (today the table has none of either).
 */
function tableEntries(
  table: {[key: string]: {ref: string; alt: string}},
  count: number
): TableEntry[] {
  const entries: TableEntry[] = [];
  for (const chrpos of Object.keys(table)) {
    if (entries.length === count) break;
    const {ref, alt} = table[chrpos];
    if (!COMPLEMENT[ref] || !COMPLEMENT[alt]) continue;
    const pair = [ref, alt].sort().join('');
    const flipped = [COMPLEMENT[ref], COMPLEMENT[alt]].sort().join('');
    if (pair === flipped) continue;
    const [chr, position] = chrpos.split(':');
    entries.push({chr, position: Number(position), ref, alt});
  }
  assert.strictEqual(entries.length, count, 'not enough usable table entries');
  return entries;
}

function line(rsid: string, chr: string, position: number, gt: string): string {
  return `${rsid}\t${chr}\t${position}\t${gt}`;
}

/** heterozygous genotype for the alleles the reference expects */
function matchingLines(entries: TableEntry[]): string[] {
  return entries.map((e, i) =>
    line(`rs90${i}`, e.chr, e.position, e.ref + e.alt)
  );
}

/** same positions, but the letters written on the opposite strand */
function flippedLines(entries: TableEntry[]): string[] {
  return entries.map((e, i) =>
    line(`rs91${i}`, e.chr, e.position, COMPLEMENT[e.ref] + COMPLEMENT[e.alt])
  );
}

/**
 * A file that passes every check unrelated to the build: 25 chromosomes and a
 * heterozygosity ratio inside the accepted range. Positions are low enough not
 * to collide with the reference tables, which start above 2 Mb.
 */
function healthyFileLines(extra: string[]): string[] {
  const lines: string[] = ['# synthetic test file'];
  for (let c = 1; c <= 22; c++) {
    for (let i = 0; i < 10; i++) {
      const position = 1000 + i * 97;
      assert.ok(
        !chrposB37[`${c}:${position}`] && !chrposB38[`${c}:${position}`],
        'filler position collides with the reference table'
      );
      lines.push(line(`rs${c}0${i}`, String(c), position, i < 3 ? 'AG' : 'AA'));
    }
  }
  lines.push(line('rs8001', 'X', 1000, 'AG'));
  lines.push(line('rs8002', 'X', 2000, 'AA'));
  lines.push(line('rs8003', 'Y', 1000, 'A'));
  lines.push(line('rs8004', 'MT', 1000, 'A'));
  return lines.concat(extra);
}

function validate(lines: string[]): Promise<ValidationInfo> {
  return new Promise((resolve, reject) => {
    const transform = new RawFormatNormalizerTransform({
      debug: false,
      checkBuild: true,
    });
    let info: ValidationInfo | undefined;
    transform.on(EVENTS.INFO, i => (info = i));
    transform.on('data', () => {}); // drain the normalized output
    transform.on('error', reject);
    transform.on('end', () =>
      info ? resolve(info) : reject(new Error('no validation info emitted'))
    );
    for (const l of lines) transform.write(l);
    transform.end();
  });
}

const B37 = tableEntries(chrposB37, 40);
const B38 = tableEntries(chrposB38, 40);

describe('checkBuildForSnp', () => {
  const entry = B37[0];
  const snp = {
    rsid: 'rs1',
    chr: entry.chr as never,
    position: entry.position,
    nocall: false,
    a1: entry.ref as never,
  };

  it('reports the build and the allele match', () => {
    assert.deepStrictEqual(checkBuildForSnp(snp), {
      build: 'b37',
      alleleMatch: true,
    });
  });

  it('reports the build even when the allele does not match', () => {
    assert.deepStrictEqual(
      checkBuildForSnp({...snp, a1: COMPLEMENT[entry.ref] as never}),
      {build: 'b37', alleleMatch: false}
    );
  });

  it('reports nothing for an unknown position', () => {
    assert.deepStrictEqual(checkBuildForSnp({...snp, position: 1234}), {
      build: undefined,
      alleleMatch: false,
    });
  });

  it('reports nothing for a no-call', () => {
    assert.deepStrictEqual(checkBuildForSnp({...snp, nocall: true}), {
      build: undefined,
      alleleMatch: false,
    });
  });
});

describe('genome build detection', () => {
  it('accepts b37 coordinates with the letters of the other strand', async () => {
    const info = await validate(healthyFileLines(flippedLines(B37)));
    assert.strictEqual(info.build, 'b37');
    assert.deepStrictEqual(info.errors, []);
    assert.ok(info.warnings.includes(WARN_ALLELES_STRAND_FLIPPED));
    assert.strictEqual(info.snps.b37, B37.length);
    assert.strictEqual(info.snps.b38, 0);
    assert.strictEqual(info.snps.alleleMismatch, B37.length);
    assert.strictEqual(info.snps.alleleMatch, 0);
  });

  it('accepts a plain b37 file without warning about the strand', async () => {
    const info = await validate(healthyFileLines(matchingLines(B37)));
    assert.strictEqual(info.build, 'b37');
    assert.deepStrictEqual(info.errors, []);
    assert.ok(!info.warnings.includes(WARN_ALLELES_STRAND_FLIPPED));
    assert.strictEqual(info.snps.alleleMatch, B37.length);
    assert.strictEqual(info.snps.alleleMismatch, 0);
  });

  it('accepts a plain b38 file', async () => {
    const info = await validate(healthyFileLines(matchingLines(B38)));
    assert.strictEqual(info.build, 'b38');
    assert.deepStrictEqual(info.errors, []);
    assert.ok(!info.warnings.includes(WARN_ALLELES_STRAND_FLIPPED));
    assert.strictEqual(info.snps.b38, B38.length);
    assert.strictEqual(info.snps.b37, 0);
  });

  it('rejects a file with no known position', async () => {
    const info = await validate(healthyFileLines([]));
    assert.deepStrictEqual(info.errors, [ERROR_GENOME_BUILD_NOT_DETECTED]);
  });

  it('rejects a file with too few known positions', async () => {
    const info = await validate(
      healthyFileLines(matchingLines(B37.slice(0, 11)))
    );
    assert.deepStrictEqual(info.errors, [ERROR_GENOME_BUILD_NOT_ENOUGH]);
  });

  it('rejects a genuinely mixed file', async () => {
    const info = await validate(
      healthyFileLines([...matchingLines(B37), ...matchingLines(B38)])
    );
    assert.deepStrictEqual(info.errors, [ERROR_GENOME_BUILD_MIX]);
  });

  it('does not call it a mix for an isolated position of the other build', async () => {
    const info = await validate(
      healthyFileLines([
        ...matchingLines(B37),
        ...matchingLines(B38.slice(0, 1)),
      ])
    );
    assert.strictEqual(info.build, 'b37');
    assert.deepStrictEqual(info.errors, []);
  });
});
