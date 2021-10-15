"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawSorterTransform = void 0;
const stream_1 = require("stream");
//rs118203890	MT	15950	G
class RawSorterTransform extends stream_1.Transform {
    constructor(opts) {
        super(opts);
        this.debug = false;
        this.chrBuffer = {};
        if ((opts === null || opts === void 0 ? void 0 : opts.debug) === true)
            this.debug = true;
    }
    log(...msg) {
        if (this.debug)
            console.log(...['DEBUG -> ', ...msg]);
    }
    _transform(chunk, encoding, callback) {
        const str = String(chunk);
        if (str[0] === '#') {
            this.push(str);
        }
        else {
            const [rsid, chr, position, ...others] = str.split('\t');
            if (!this.chrBuffer[chr])
                this.chrBuffer[chr] = [];
            const pos = parseInt(position, 10);
            if (!isNaN(pos)) {
                this.chrBuffer[chr][pos] = str;
            }
        }
        callback();
    }
    _flush(callback) {
        const sortedChrs = Object.keys(this.chrBuffer)
            .map((chr) => ({
            chr,
            idx: chr === 'X' ? 23 :
                chr === 'Y' ? 24 :
                    chr === 'XY' ? 25 :
                        chr === 'MT' ? 26 :
                            parseInt(chr, 10)
        }))
            .sort((a, b) => a.idx - b.idx)
            .map(i => i.chr);
        sortedChrs.forEach(chr => {
            const chrMap = this.chrBuffer[chr];
            chrMap.forEach(line => {
                if (line)
                    this.push(line);
            });
        });
        callback();
    }
}
exports.RawSorterTransform = RawSorterTransform;
//# sourceMappingURL=raw.sorter.js.map