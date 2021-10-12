"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAutosomal = void 0;
const isAutosomal = (chr) => 'X,Y,XY,MT'.indexOf(chr) === -1;
exports.isAutosomal = isAutosomal;
//# sourceMappingURL=snp-utils.js.map