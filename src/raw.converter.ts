import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { ValidationInfo } from './raw.models';
import * as split2 from 'split2';
import {RawFormatNormalizerTransform, EVENTS} from './raw.normalizer';
import { PassThrough } from 'stream';

export function convertLocalDtcFile(
  filepath: string,
  outfilepath: string = 'converted.txt',
  gzipOutput: boolean = false,
  rawTransformer = new RawFormatNormalizerTransform()
): Promise<{validation: ValidationInfo, normalizedLocalFile: string}> {

  const rs = createReadStream(filepath, 'utf-8');
  const normalizedLocalFile = `${outfilepath}${ gzipOutput && outfilepath.indexOf('.gz') === -1 ? '.gz' : '' }`;

  const out = createWriteStream(normalizedLocalFile);

  const p = new Promise<{validation: ValidationInfo, normalizedLocalFile: string}>((resolve, reject) => {
    rs
      .pipe(split2())
      .pipe(rawTransformer)
      .pipe(gzipOutput ? createGzip() : new PassThrough())
      .pipe(out);
    rs.on('error', err => reject(err));
    let validation: ValidationInfo;
    rawTransformer.on(EVENTS.INFO, (v:ValidationInfo) => validation = v);
    out.on('finish', () => resolve({validation, normalizedLocalFile}))
    out.on('end', () => resolve({validation, normalizedLocalFile}))
  });
  p.finally(() => rs.close());
  return p;
}
