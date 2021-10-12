import {allele, chr, nocall, Snp} from '../raw.models';
import {isAutosomal} from './snp-utils';

export function cleanGenotypeLine(line: string): string {
  return line.replace(/"/g, '').replace(/,|;/g, ' ').replace(/\s+/g, '\t');
}

export function convertLine2Snp(line: string): Snp {
  const [rsid, chrStr, posStr, base1, base2, extra] =
    cleanGenotypeLine(line).split('\t');
  const chrNum = parseInt(chrStr, 10);
  const chr: chr =
    chrNum === 23
      ? 'X'
      : chrNum === 24
      ? 'Y'
      : chrNum === 25
      ? 'MT'
      : !isNaN(chrNum) && chrNum > 0
      ? (chrNum.toFixed(0) as chr)
      : (chrStr as chr);
  const position = parseInt(posStr, 10);
  let warn = undefined;
  let a1: allele | nocall = '-';
  let a2 = undefined;
  if (isNaN(position) || position <= 0)
    throw new Error('cannot parse SNP. Position not valid: ' + posStr);
  if (extra) {
    warn = 'Extra info: ' + extra;
  }
  if (base1 && base1.length === 2) {
    // lo normal
    if (base2 && base2.length > 0) {
      warn = 'base 2: ' + base2;
    }
    a1 = base1[0] as allele | nocall;
    a2 = base1[1] as allele | nocall;
  } else if (base1 && base1.length === 1 && base2 && base2.length === 1) {
    a1 = base1[0] as allele | nocall;
    a2 = base2[0] as allele | nocall;
  } else if (base1 && base1.length === 1 && !isAutosomal(chr)) {
    a1 = base1[0] as allele | nocall;
    a2 = undefined;
  } else {
    throw new Error(
      `Not valid SNP: ${rsid}, ${chr}, pos: ${position} "${base1}"  "${base2}" `
    );
  }
  const nocall = a1 === '-';
  if (nocall) {
    a2 = '-' as nocall;
  }
  return {
    rsid,
    chr,
    position,
    a1,
    a2,
    nocall,
    warn,
  };
}
