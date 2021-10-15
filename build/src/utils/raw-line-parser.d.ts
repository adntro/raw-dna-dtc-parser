import { Snp } from '../raw.models';
export declare function cleanGenotypeLine(line: string): string;
/**
 * 2010-08-Y-3314,0,0,--
 * rs4475691       1       846808  CC
 * "rs11240777","1","798959","AG"
 * rs199474699	26	15990	C	C
 */
export declare function convertLine2Snp(line: string): Snp;
/**
  mapper['X'] = 23
  mapper['Y'] = 24
  mapper['XY'] = 25
  mapper['MT'] = 26
 */
export declare function convertLine2SnpGeneric(line: string): Snp;
