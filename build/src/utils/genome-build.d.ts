import { genomeBuild, Snp } from '../raw.models';
export declare const chrposB37: {
    [key: string]: {
        rsid: string;
        ref: string;
        alt: string;
    };
};
export declare const chrposB38: {
    [key: string]: {
        rsid: string;
        ref: string;
        alt: string;
    };
};
export interface BuildHit {
    /** build of the reference table the position belongs to, if any */
    build: genomeBuild | undefined;
    /** whether a1 is one of the alleles the reference expects at that position */
    alleleMatch: boolean;
}
/**
 * The position decides the build: the b37 and b38 position sets of the table do
 * not overlap, so a position can only belong to one of them. The alleles are
 * reported apart, because a file can carry the coordinates of one build with the
 * letters of the other (a liftover that repositions without complementing), and
 * that must not make the vote disappear.
 */
export declare function checkBuildForSnp(snp: Snp): BuildHit;
