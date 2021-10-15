"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertLocalDtcFile = void 0;
const fs_1 = require("fs");
const split2 = require("split2");
const raw_normalizer_1 = require("./raw.normalizer");
const files_1 = require("./utils/files");
function convertLocalDtcFile(filepath, outfilepath = 'converted.txt', gzipOutput = false, rawTransformer = new raw_normalizer_1.RawFormatNormalizerTransform(), highWaterMark = 256 * 1024) {
    const rs = fs_1.createReadStream(filepath, { encoding: 'utf-8', highWaterMark });
    const normalizedLocalFile = `${outfilepath}${false && gzipOutput && outfilepath.indexOf('.gz') === -1 ? '.gz' : ''}`;
    //const normalizedLocalFile = `${outfilepath}`;
    const out = fs_1.createWriteStream(normalizedLocalFile, { encoding: 'utf-8', highWaterMark });
    const p = new Promise((resolve, reject) => {
        rs
            .pipe(split2())
            .pipe(rawTransformer)
            //   .pipe(gzipOutput ? createGzip() : new PassThrough())
            .pipe(out);
        rs.on('error', err => reject(err));
        let validation;
        rawTransformer.on(raw_normalizer_1.EVENTS.INFO, (v) => validation = v);
        out.on('finish', () => resolve({ validation, normalizedLocalFile }));
        out.on('end', () => resolve({ validation, normalizedLocalFile }));
    });
    p.finally(() => rs.close());
    return p.then(({ validation, normalizedLocalFile }) => {
        if (gzipOutput) {
            return files_1.gzip(normalizedLocalFile).then(normalizedLocalFileGz => ({ validation, normalizedLocalFile: normalizedLocalFileGz }));
        }
        else {
            return { validation, normalizedLocalFile };
        }
    });
}
exports.convertLocalDtcFile = convertLocalDtcFile;
//# sourceMappingURL=raw.converter.js.map