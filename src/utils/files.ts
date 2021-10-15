import { join } from 'path'
import { tmpdir } from 'os'
import { createReadStream, createWriteStream, stat, unlink } from 'fs';
import { createGunzip, createGzip } from 'zlib';

export function tmpFile(nameSuffix: string = 'sample_file.txt'): string {
  const fileName = `${Date.now()}_${nameSuffix.split('/').pop()}`
  return join(tmpdir(), fileName);
}

export function deleteFile(filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    unlink(filepath, (err) => {
      if (err) reject(err);
      else resolve();
    })
  })
}

export function fileExists(filepath: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    stat(filepath, (err, stats) => {
      if (err) reject(err);
      else resolve(stats && stats.isFile());
    })
  })
}

export function isCompressed(filepath: string): 'gzip' | 'zip' | undefined {
  if (filepath.endsWith('.gz')) {
    return 'gzip';
  } else if (filepath.endsWith('.zip')) {
    return 'zip';
  } else {
    return undefined;
  }
}

export function ungzip(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
  const out = file + '.out.txt';
  const ws = createWriteStream(out);
  createReadStream(file)
    .pipe(createGunzip())
    .pipe(ws)
    ws.on('error', err => reject(err))
    ws.on('finish', () => resolve(out))
  })
}

export function gzip(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
  const out = file + '.gz';
  const ws = createWriteStream(out);
  createReadStream(file)
    .pipe(createGzip())
    .pipe(ws)
    ws.on('error', err => reject(err))
    ws.on('finish', () => resolve(out))
  })
}
