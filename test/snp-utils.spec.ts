import {isAutosomal} from '../src/utils/snp-utils';
import * as assert from 'assert';
import {chr} from '../src';

describe('SNP Utils', () => {
  it('Autosomal', () => {
    for (let i = 1; i < 23; i++) {
      assert.strictEqual(isAutosomal(String(i) as chr), true);
    }
  });
  it('Not Autosomal', () => {
    assert.strictEqual(isAutosomal('X'), false);
    assert.strictEqual(isAutosomal('MT'), false);
    assert.strictEqual(isAutosomal('Y'), false);
  });
});
