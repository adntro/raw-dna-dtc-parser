export type rawFormat =
  | '23andme'
  | 'myHeritage'
  | 'ancestryDNA'
  | 'familyTreeDNA'
  | 'other'
  | 'livingDNA';

export type chr =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | 'X'
  | 'Y'
  | 'MT'
  | 'XY';

export type allele = 'A' | 'C' | 'G' | 'T' | 'I' | 'D';
export type nocall = '-';

export type genomeBuild = 'b37' | 'b38';
export type gender = 'M' | 'F';

export interface Snp {
  rsid: string;
  chr: chr;
  position: number;
  nocall: boolean;
  a1: allele | nocall;
  a2?: allele | nocall;
  warn?: string;
}

export interface SnpInfo {
  total: number;
  nocall: number;
  hom: number;
  het: number;
  x: number;
  xHet: number;
  y: number;
  mt: number;
  hetRatio: number;
  b37: number;
  b38: number;
}

export interface ValidationInfo {
  build: genomeBuild;
  rawFormat: rawFormat;
  warnings: string[];
  errors: string[];
  snps: SnpInfo;
  gender: gender | undefined;
}
