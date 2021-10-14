"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawFormatNormalizerTransform = exports.guessFormat = exports.EVENTS = void 0;
const stream_1 = require("stream");
const genome_build_1 = require("./utils/genome-build");
const raw_errors_1 = require("./raw.errors");
const raw_line_parser_1 = require("./utils/raw-line-parser");
const snp_utils_1 = require("./utils/snp-utils");
/**
 * 2010-08-Y-3314,0,0,--
 * rs4475691       1       846808  CC
 * "rs11240777","1","798959","AG"
 * rs199474699	26	15990	C	C
 */
exports.EVENTS = {
    INFO: 'info',
    HEADER: 'header',
    WARN: 'warn',
    WARNS: 'warns',
};
function guessFormat(header) {
    const h = String(header).toLowerCase();
    if (h.indexOf('23andme') > -1) {
        return '23andme';
    }
    else if (h.indexOf('myheritage') > -1) {
        return 'myHeritage';
    }
    else if (h.indexOf('living dna') > -1 || h.indexOf('livingdna') > -1) {
        return 'livingDNA';
    }
    else if (h.indexOf('ancestrydna') > -1) {
        return 'ancestryDNA';
    }
    else if (h.indexOf('RSID,CHROMOSOME,POSITION,RESULT'.toLowerCase()) > -1) {
        return 'familyTreeDNA';
    }
    else {
        return 'other';
    }
}
exports.guessFormat = guessFormat;
class RawFormatNormalizerTransform extends stream_1.Transform {
    constructor(opts) {
        super(opts);
        this.genotypeStarted = false;
        this.headerLines = [];
        this.format = 'other';
        this.warnings = new Set();
        this.lineCount = 0;
        this.snpInfo = {
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
        this.chromosomes = new Set();
        this.on(exports.EVENTS.HEADER, header => {
            this.format = guessFormat(header);
        });
    }
    log(...msg) {
        console.log(...['DEBUG -> ', ...msg]);
    }
    warn(msg) {
        this.emit(exports.EVENTS.WARN, msg);
        this.warnings.add(msg);
    }
    _transform(chunk, encoding, callback) {
        if (this.lineCount === 0) {
            //emit header
            this.push('#rsid\tchr\tposition\tbase\n');
        }
        this.lineCount++;
        const str = String(chunk);
        if (!this.genotypeStarted) {
            if (str[0] === '#' || str.match(/rsid|chromosome|chr/i) !== null) {
                this.headerLines.push(str);
            }
            else {
                this.genotypeStarted = true;
                this.emit(exports.EVENTS.HEADER, this.headerLines.join('\n'));
            }
        }
        if (this.genotypeStarted) {
            try {
                const snp = raw_line_parser_1.convertLine2Snp(str);
                if (snp.chr === 'XY')
                    throw new Error('Skip pseudoautosomal XY');
                this.push(`${snp.rsid}\t${snp.chr}\t${snp.position}\t${snp.a1}${snp.a2 ? snp.a2 : ''}\n`);
                if (snp_utils_1.isAutosomal(snp.chr)) {
                    if (snp.nocall)
                        this.snpInfo.nocall++;
                    else {
                        this.snpInfo.total++;
                        if (snp.a1 === snp.a2)
                            this.snpInfo.hom++;
                        else
                            this.snpInfo.het++;
                    }
                }
                else if (!snp.nocall) {
                    if (snp.chr === 'MT')
                        this.snpInfo.mt++;
                    else if (snp.chr === 'X') {
                        this.snpInfo.x++;
                        if (snp.a2 && snp.a2 !== '-' && snp.a2 !== snp.a1)
                            this.snpInfo.xHet++;
                    }
                    else if (snp.chr === 'Y')
                        this.snpInfo.y++;
                }
                if (snp.warn) {
                    this.warn(snp.warn);
                }
                this.chromosomes.add(snp.chr);
                // build 37 38
                const build = genome_build_1.checkBuildForSnp(snp);
                if (build === 'b37')
                    this.snpInfo.b37++;
                else if (build === 'b38')
                    this.snpInfo.b38++;
            }
            catch (e) {
                this.warn(e + '');
            }
        }
        callback();
    }
    _flush(callback) {
        this.snpInfo.hetRatio = Math.floor((100 * this.snpInfo.het) / this.snpInfo.total);
        const warnings = Array.from(this.warnings.values());
        const errors = [];
        let gender;
        if (this.snpInfo.x > 0 && this.snpInfo.xHet / this.snpInfo.x > 0.01) {
            gender = 'F';
        }
        else if (this.snpInfo.y > 20) {
            gender = 'M';
        }
        // ERROR CHECKS
        if (this.chromosomes.size < 23) {
            errors.push(raw_errors_1.ERROR_MISSING_CHROMOSOMES);
        }
        if (this.snpInfo.b37 > 0 && this.snpInfo.b38 > 0) {
            errors.push(raw_errors_1.ERROR_GENOME_BUILD_MIX);
        }
        else if (this.snpInfo.b37 === 0 && this.snpInfo.b38 === 0) {
            errors.push(raw_errors_1.ERROR_GENOME_BUILD_NOT_DETECTED);
        }
        else if (this.snpInfo.b37 < 25 && this.snpInfo.b38 < 25) {
            errors.push(raw_errors_1.ERROR_GENOME_BUILD_NOT_ENOUGH);
        }
        if (this.snpInfo.hetRatio > 60 || this.snpInfo.hetRatio < 10) {
            errors.push(raw_errors_1.ERROR_HET_RATIO);
        }
        //
        const validationInfo = {
            build: this.snpInfo.b38 > this.snpInfo.b37 ? 'b38' : 'b37',
            rawFormat: this.format,
            gender,
            snps: this.snpInfo,
            errors,
            warnings,
        };
        this.emit(exports.EVENTS.INFO, validationInfo);
        this.emit(exports.EVENTS.WARNS, warnings);
        this.log('FILE INFO: ', JSON.stringify(validationInfo), `Warnings: ${this.warnings.size}. ${warnings.join('; ')}`);
        callback();
    }
}
exports.RawFormatNormalizerTransform = RawFormatNormalizerTransform;
//# sourceMappingURL=raw.normalizer.js.map