"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gzip = exports.ungzip = exports.isCompressed = exports.fileExists = exports.deleteFile = exports.tmpFile = void 0;
const path_1 = require("path");
const os_1 = require("os");
const fs_1 = require("fs");
const zlib_1 = require("zlib");
function tmpFile(nameSuffix = 'sample_file.txt') {
    const fileName = `${Date.now()}_${nameSuffix.split('/').pop()}`;
    return path_1.join(os_1.tmpdir(), fileName);
}
exports.tmpFile = tmpFile;
function deleteFile(filepath) {
    return new Promise((resolve, reject) => {
        fs_1.unlink(filepath, (err) => {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
}
exports.deleteFile = deleteFile;
function fileExists(filepath) {
    return new Promise((resolve, reject) => {
        fs_1.stat(filepath, (err, stats) => {
            if (err)
                reject(err);
            else
                resolve(stats && stats.isFile());
        });
    });
}
exports.fileExists = fileExists;
function isCompressed(filepath) {
    if (filepath.endsWith('.gz')) {
        return 'gzip';
    }
    else if (filepath.endsWith('.zip')) {
        return 'zip';
    }
    else {
        return undefined;
    }
}
exports.isCompressed = isCompressed;
function ungzip(file) {
    return new Promise((resolve, reject) => {
        const out = file + '.out.txt';
        const ws = fs_1.createWriteStream(out);
        fs_1.createReadStream(file)
            .pipe(zlib_1.createGunzip())
            .pipe(ws);
        ws.on('error', err => reject(err));
        ws.on('finish', () => resolve(out));
    });
}
exports.ungzip = ungzip;
function gzip(file) {
    return new Promise((resolve, reject) => {
        const out = file + '.gz';
        const ws = fs_1.createWriteStream(out);
        fs_1.createReadStream(file)
            .pipe(zlib_1.createGzip())
            .pipe(ws);
        ws.on('error', err => reject(err));
        ws.on('finish', () => resolve(out));
    });
}
exports.gzip = gzip;
//# sourceMappingURL=files.js.map