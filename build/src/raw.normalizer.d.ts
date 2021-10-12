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
export declare class RawFormatNormalizerTransform extends Transform {
    genotypeStarted: boolean;
    headerLines: string[];
    format: rawFormat;
    warnings: Set<string>;
    lineCount: number;
    snpInfo: SnpInfo;
    chromosomes: Set<chr>;
    constructor(opts?: TransformOptions);
    private log;
    private warn;
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void;
    _flush(callback: TransformCallback): void;
}
