import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { ValidationInfo } from './raw.models';
import * as split2 from 'split2';
import {RawFormatNormalizerTransform, EVENTS} from './raw.normalizer';
import { PassThrough } from 'stream';
import { gzip } from './utils/files'

export function convertLocalDtcFile(
  filepath: string,
  outfilepath: string = 'converted.txt',
  gzipOutput: boolean = false,
  rawTransformer = new RawFormatNormalizerTransform(),
  highWaterMark = 256 * 1024
): Promise<{validation: ValidationInfo, normalizedLocalFile: string}> {

  const rs = createReadStream(filepath, { encoding: 'utf-8', highWaterMark });
  const normalizedLocalFile = `${outfilepath}${ false && gzipOutput && outfilepath.indexOf('.gz') === -1 ? '.gz' : '' }`;
  //const normalizedLocalFile = `${outfilepath}`;

  const out = createWriteStream(normalizedLocalFile, { encoding: 'utf-8', highWaterMark });

  const p = new Promise<{validation: ValidationInfo, normalizedLocalFile: string}>((resolve, reject) => {
    rs
      .pipe(split2())
      .pipe(rawTransformer)
   //   .pipe(gzipOutput ? createGzip() : new PassThrough())
      .pipe(out);
    rs.on('error', err => reject(err));
    let validation: ValidationInfo;
    rawTransformer.on(EVENTS.INFO, (v:ValidationInfo) => validation = v);
    out.on('finish', () => resolve({validation, normalizedLocalFile}));
    out.on('end', () => resolve({validation, normalizedLocalFile}));
  });
  p.finally(() => rs.close());
  return p.then(({validation, normalizedLocalFile}) => {
    if (gzipOutput) {
      return gzip(normalizedLocalFile).then(normalizedLocalFileGz => ({validation, normalizedLocalFile: normalizedLocalFileGz}))
    } else {
      return {validation, normalizedLocalFile}
    }
  });
}
