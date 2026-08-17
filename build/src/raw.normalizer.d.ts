/// <reference types="node" />
import { Transform, TransformOptions, TransformCallback } from 'stream';
import { chr, rawFormat, SnpInfo } from './raw.models';
/**
 * 2010-08-Y-3314,0,0,--
 * rs4475691       1       846808  CC
 * "rs11240777","1","798959","AG"
 * rs199474699	26	15990	C	C
 */
export declare const EVENTS: {
    INFO: string;
    HEADER: string;
    WARN: string;
    WARNS: string;
};
export declare function guessFormat(header: string): rawFormat;
export interface RawFormatNormalizerTransformOptions extends TransformOptions {
    debug: boolean;
    checkBuild: boolean;
}
/** minimum votes of the minority build to consider the file a real mix */
export declare const BUILD_MIX_MIN_VOTES = 5;
/** minimum share of the total votes for the minority build to mean a mix */
export declare const BUILD_MIX_MIN_RATIO = 0.05;
/** minimum votes needed to trust the detected build */
export declare const BUILD_MIN_VOTES = 25;
/** minimum evaluated positions before reporting a strand flip */
export declare const STRAND_FLIP_MIN_EVALUATED = 20;
/** share of mismatching alleles that means the whole file is flipped */
export declare const STRAND_FLIP_MIN_RATIO = 0.8;
export declare class RawFormatNormalizerTransform extends Transform {
    genotypeStarted: boolean;
    headerLines: string[];
    format: rawFormat;
    debug: boolean;
    checkBuild: boolean;
    warnings: Set<string>;
    lineCount: number;
    snpInfo: SnpInfo;
    chromosomes: Set<chr>;
    constructor(opts?: RawFormatNormalizerTransformOptions);
    private log;
    private warn;
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void;
    _flush(callback: TransformCallback): void;
}
