"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertLine2SnpGeneric = exports.convertLine2Snp = exports.cleanGenotypeLine = void 0;
const snp_utils_1 = require("./snp-utils");
function cleanGenotypeLine(line) {
    return line.replace(/"/g, '').replace(/,|;/g, ' ').replace(/\s+/g, '\t');
}
exports.cleanGenotypeLine = cleanGenotypeLine;
/**
 * 2010-08-Y-3314,0,0,--
 * rs4475691       1       846808  CC
 * "rs11240777","1","798959","AG"
 * rs199474699	26	15990	C	C
 */
function convertLine2Snp(line) {
    return convertLine2SnpGeneric(line);
}
exports.convertLine2Snp = convertLine2Snp;
/**
  mapper['X'] = 23
  mapper['Y'] = 24
  mapper['XY'] = 25
  mapper['MT'] = 26
 */
function convertLine2SnpGeneric(line) {
    if (('' + line).length > 60)
        throw new Error('invalid snp line length');
    const [rsid, chrStr, posStr, base1, base2, extra] = cleanGenotypeLine(line).split('\t');
    const chrNum = parseInt(chrStr, 10);
    const chr = chrNum === 23 ? 'X'
        : chrNum === 24 ? 'Y'
            : chrNum === 25 ? 'XY' //XY AncestryDNA
                : chrNum === 26 ? 'MT'
                    : !isNaN(chrNum) && chrNum > 0
                        ? chrNum.toFixed(0)
                        : chrStr;
    const position = parseInt(posStr, 10);
    let warn = undefined;
    let a1 = '-';
    let a2 = undefined;
    if (isNaN(position) || position <= 0)
        throw new Error('cannot parse SNP. Position not valid');
    if (extra) {
        warn = 'unexpected extra info';
    }
    if (base1 && base1.length === 2) {
        // lo normal
        if (base2 && base2.length > 0) {
            warn = 'unexpected base 2';
        }
        a1 = base1[0];
        a2 = base1[1];
    }
    else if (base1 && base1.length === 1 && base2 && base2.length === 1) {
        a1 = base1[0];
        a2 = base2[0];
    }
    else if (base1 && base1.length === 1 && !snp_utils_1.isAutosomal(chr)) {
        a1 = base1[0];
        a2 = undefined;
    }
    else {
        throw new Error(`Not valid SNP: ${rsid}, ${chr}, pos: ${position} "${base1}"  "${base2}" `);
    }
    if ('' + a1 === '0') {
        a1 = '-';
    }
    const nocall = a1 === '-';
    if (chr === 'Y' || chr === 'XY' || chr === 'MT') {
        a2 = undefined;
    }
    else if (nocall) {
        a2 = '-';
    }
    else if (a2 && a1 > a2) {
        [a1, a2] = [a2, a1];
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
exports.convertLine2SnpGeneric = convertLine2SnpGeneric;
//# sourceMappingURL=raw-line-parser.js.map