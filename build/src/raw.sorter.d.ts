/// <reference types="node" />
import { Transform, TransformCallback } from 'stream';
import { RawFormatNormalizerTransformOptions } from './raw.normalizer';
export declare class RawSorterTransform extends Transform {
    debug: boolean;
    chrBuffer: {
        [key: string]: string[];
    };
    constructor(opts?: RawFormatNormalizerTransformOptions);
    private log;
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void;
    _flush(callback: TransformCallback): void;
}
