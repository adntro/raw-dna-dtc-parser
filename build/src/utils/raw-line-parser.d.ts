import { Snp } from '../raw.models';
export declare function cleanGenotypeLine(line: string): string;
/**
 *   mapper['X'] = 23
  mapper['Y'] = 24
  mapper['XY'] = 25
  mapper['MT'] = 26
 */
export declare function convertLine2Snp(line: string): Snp;
