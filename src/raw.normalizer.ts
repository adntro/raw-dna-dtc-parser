import {Transform, TransformOptions, TransformCallback} from 'stream';
import {chr, gender, rawFormat, SnpInfo, ValidationInfo} from './raw.models';
import {checkBuildForSnp} from './utils/genome-build';
import {
  ERROR_GENOME_BUILD_MIX,
  ERROR_GENOME_BUILD_NOT_DETECTED,
  ERROR_GENOME_BUILD_NOT_ENOUGH,
  ERROR_HET_RATIO,
  ERROR_MISSING_CHROMOSOMES
} from './raw.errors';
import {convertLine2Snp} from './utils/raw-line-parser';
import {isAutosomal} from './utils/snp-utils';

/**
 * 2010-08-Y-3314,0,0,--
 * rs4475691       1       846808  CC
 * "rs11240777","1","798959","AG"
 * rs199474699	26	15990	C	C
 */

export const EVENTS = {
  INFO: 'info',
  HEADER: 'header',
  WARN: 'warn',
  WARNS: 'warns',
};

export function guessFormat(header: string): rawFormat {
  const h = String(header).toLowerCase();
  if (h.indexOf('23andme') > -1) {
    return '23andme';
  } else if (h.indexOf('myheritage') > -1) {
    return 'myHeritage';
  } else if (h.indexOf('living dna') > -1 || h.indexOf('livingdna') > -1) {
    return 'livingDNA';
  } else if (h.indexOf('ancestrydna') > -1) {
    return 'ancestryDNA';
  } else if (h.indexOf('RSID,CHROMOSOME,POSITION,RESULT'.toLowerCase()) > -1) {
    return 'familyTreeDNA';
  } else {
    return 'other';
  }
}

export interface RawFormatNormalizerTransformOptions extends TransformOptions {
  debug: boolean;
}

export class RawFormatNormalizerTransform extends Transform {
  genotypeStarted = false;
  headerLines: string[] = [];
  format: rawFormat = 'other';
  debug = false;

  warnings = new Set<string>();

  lineCount = 0;

  snpInfo: SnpInfo = {
    het: 0,
    y: 0,
    hom: 0,
    mt: 0,
    nocall: 0,
    total: 0,
    x: 0,
    xHet: 0,
    hetRatio: -1,
    b37: 0,
    b38: 0,
  };

  chromosomes = new Set<chr>();

  constructor(opts?: RawFormatNormalizerTransformOptions) {
    super(opts);
    if (opts?.debug === true) this.debug = true;
    this.on(EVENTS.HEADER, header => {
      this.format = guessFormat(header);
    });
  }

  private log(...msg: any[]) {
    if (this.debug)  console.log(...['DEBUG -> ', ...msg]);
  }

  private warn(msg: string): void {
    this.emit(EVENTS.WARN, msg);
    this.warnings.add(msg);
  }

  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    if (this.lineCount === 0) {
      //emit header
      this.push('#rsid\tchr\tposition\tbase\n');
    }
    this.lineCount++;
    const str = String(chunk);
    if (!this.genotypeStarted) {
      if (str[0] === '#' || str.match(/rsid|chromosome|chr/i) !== null) {
        this.headerLines.push(str);
      } else {
        this.genotypeStarted = true;
        this.emit(EVENTS.HEADER, this.headerLines.join('\n'));
      }
    }

    if (this.genotypeStarted) {
      try {
        const snp = convertLine2Snp(str);
        if (snp.chr === 'XY') throw new Error('Skip pseudoautosomal XY');
        this.push(
          `${snp.rsid}\t${snp.chr}\t${snp.position}\t${snp.a1}${
            snp.a2 ? snp.a2 : ''
          }\n`
        );
        if (isAutosomal(snp.chr)) {
          if (snp.nocall) this.snpInfo.nocall++;
          else {
            this.snpInfo.total++;
            if (snp.a1 === snp.a2) this.snpInfo.hom++;
            else this.snpInfo.het++;
          }
        } else if (!snp.nocall) {
          if (snp.chr === 'MT') this.snpInfo.mt++;
          else if (snp.chr === 'X') {
            this.snpInfo.x++;
            if (snp.a2 && snp.a2 !== '-' && snp.a2 !== snp.a1)
              this.snpInfo.xHet++;
          } else if (snp.chr === 'Y') this.snpInfo.y++;
        }
        if (snp.warn) {
          this.warn(snp.warn);
        }
        this.chromosomes.add(snp.chr);
        // build 37 38
        const build = checkBuildForSnp(snp);
        if (build === 'b37') this.snpInfo.b37++;
        else if (build === 'b38') this.snpInfo.b38++;
      } catch (e) {
        this.warn(e + '');
      }
    }

    callback();
  }

  _flush(callback: TransformCallback): void {
    this.snpInfo.hetRatio = Math.floor(
      (100 * this.snpInfo.het) / this.snpInfo.total
    );
    const warnings = Array.from(this.warnings.values());
    const errors: string[] = [];
    let gender: gender | undefined;
    if (this.snpInfo.x > 0 && this.snpInfo.xHet / this.snpInfo.x > 0.01) {
      gender = 'F';
    } else if (this.snpInfo.y > 20) {
      gender = 'M';
    }
    // ERROR CHECKS
    if (this.chromosomes.size < 23) {
      errors.push(ERROR_MISSING_CHROMOSOMES);
    }
    if (this.snpInfo.b37 > 0 && this.snpInfo.b38 > 0) {
      errors.push(ERROR_GENOME_BUILD_MIX);
    } else if (this.snpInfo.b37 === 0 && this.snpInfo.b38 === 0) {
      errors.push(ERROR_GENOME_BUILD_NOT_DETECTED);
    } else if (this.snpInfo.b37 < 25 && this.snpInfo.b38 < 25) {
      errors.push(ERROR_GENOME_BUILD_NOT_ENOUGH);
    }
    if (this.snpInfo.hetRatio > 60 || this.snpInfo.hetRatio < 10) {
      errors.push(ERROR_HET_RATIO);
    }
    //
    const validationInfo: ValidationInfo = {
      build: this.snpInfo.b38 > this.snpInfo.b37 ? 'b38' : 'b37',
      rawFormat: this.format,
      gender,
      snps: this.snpInfo,
      errors,
      warnings,
    };
    this.emit(EVENTS.INFO, validationInfo);
    this.emit(EVENTS.WARNS, warnings);
    this.log(
      'FILE INFO: ',
      JSON.stringify(validationInfo),
      `Warnings: ${this.warnings.size}. ${warnings.join('; ')}`
    );
    callback();
  }
}
