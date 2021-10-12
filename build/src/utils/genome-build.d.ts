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
export declare function checkBuildForSnp(snp: Snp): genomeBuild | undefined;
