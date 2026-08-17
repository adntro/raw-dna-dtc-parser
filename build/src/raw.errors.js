"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WARN_ALLELES_STRAND_FLIPPED = exports.ERROR_HET_RATIO = exports.ERROR_GENOME_BUILD_NOT_ENOUGH = exports.ERROR_GENOME_BUILD_NOT_DETECTED = exports.ERROR_GENOME_BUILD_MIX = exports.ERROR_MISSING_CHROMOSOMES = void 0;
exports.ERROR_MISSING_CHROMOSOMES = 'ERROR_MISSING_CHROMOSOMES';
exports.ERROR_GENOME_BUILD_MIX = 'ERROR_GENOME_BUILD_MIX';
exports.ERROR_GENOME_BUILD_NOT_DETECTED = 'ERROR_GENOME_BUILD_NOT_DETECTED';
exports.ERROR_GENOME_BUILD_NOT_ENOUGH = 'ERROR_GENOME_BUILD_NOT_ENOUGH';
exports.ERROR_HET_RATIO = 'ERROR_HET_RATIO';
/**
 * The build was detected by position, but the alleles of those same positions
 * are consistently on the opposite strand: coordinates of one build with the
 * letters of the other. Does not block the file.
 */
exports.WARN_ALLELES_STRAND_FLIPPED = 'WARN_ALLELES_STRAND_FLIPPED';
//# sourceMappingURL=raw.errors.js.map