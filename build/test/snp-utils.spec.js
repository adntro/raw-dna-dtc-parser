"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const snp_utils_1 = require("../src/utils/snp-utils");
const assert = require("assert");
describe('SNP Utils', () => {
    it('Autosomal', () => {
        for (let i = 1; i < 23; i++) {
            assert.strictEqual(snp_utils_1.isAutosomal(String(i)), true);
        }
    });
    it('Not Autosomal', () => {
        assert.strictEqual(snp_utils_1.isAutosomal('X'), false);
        assert.strictEqual(snp_utils_1.isAutosomal('MT'), false);
        assert.strictEqual(snp_utils_1.isAutosomal('Y'), false);
    });
});
//# sourceMappingURL=snp-utils.spec.js.map