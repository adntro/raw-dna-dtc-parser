import { ValidationInfo } from './raw.models';
import { RawFormatNormalizerTransform } from './raw.normalizer';
export declare function convertLocalDtcFile(filepath: string, outfilepath?: string, gzipOutput?: boolean, rawTransformer?: RawFormatNormalizerTransform, highWaterMark?: number): Promise<{
    validation: ValidationInfo;
    normalizedLocalFile: string;
}>;
