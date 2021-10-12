import {hi} from '../src/index';
import * as assert from 'assert';

describe('Hi', () => {
  it('Should greet with your name', () => {
    assert.strictEqual(hi('Primate John'), 'Hi Primate John!');
  });
});
