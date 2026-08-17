export const ERROR_MISSING_CHROMOSOMES = 'ERROR_MISSING_CHROMOSOMES';
export const ERROR_GENOME_BUILD_MIX = 'ERROR_GENOME_BUILD_MIX';
export const ERROR_GENOME_BUILD_NOT_DETECTED =
  'ERROR_GENOME_BUILD_NOT_DETECTED';
export const ERROR_GENOME_BUILD_NOT_ENOUGH = 'ERROR_GENOME_BUILD_NOT_ENOUGH';
export const ERROR_HET_RATIO = 'ERROR_HET_RATIO';

/**
 * The build was detected by position, but the alleles of those same positions
 * are consistently on the opposite strand: coordinates of one build with the
 * letters of the other. Does not block the file.
 */
export const WARN_ALLELES_STRAND_FLIPPED = 'WARN_ALLELES_STRAND_FLIPPED';
