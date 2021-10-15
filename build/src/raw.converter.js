"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertLocalDtcFile = void 0;
const fs_1 = require("fs");
const zlib_1 = require("zlib");
const split2 = require("split2");
const raw_normalizer_1 = require("./raw.normalizer");
const stream_1 = require("stream");
function convertLocalDtcFile(filepath, outfilepath = 'converted.txt', gzipOutput = false, rawTransformer = new raw_normalizer_1.RawFormatNormalizerTransform()) {
    const rs = fs_1.createReadStream(filepath, 'utf-8');
    const normalizedLocalFile = `${outfilepath}${gzipOutput && outfilepath.indexOf('.gz') === -1 ? '.gz' : ''}`;
    const out = fs_1.createWriteStream(normalizedLocalFile);
    const p = new Promise((resolve, reject) => {
        rs
            .pipe(split2())
            .pipe(rawTransformer)
            .pipe(gzipOutput ? zlib_1.createGzip() : new stream_1.PassThrough())
            .pipe(out);
        rs.on('error', err => reject(err));
        let validation;
        rawTransformer.on(raw_normalizer_1.EVENTS.INFO, (v) => validation = v);
        out.on('finish', () => resolve({ validation, normalizedLocalFile }));
        out.on('end', () => resolve({ validation, normalizedLocalFile }));
    });
    p.finally(() => rs.close());
    return p;
}
exports.convertLocalDtcFile = convertLocalDtcFile;
//# sourceMappingURL=raw.converter.js.map