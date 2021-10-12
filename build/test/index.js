"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
const assert = require("assert");
describe('Hi', () => {
    it('Should greet with your name', () => {
        assert.strictEqual(index_1.hi('Primate John'), 'Hi Primate John!');
    });
});
//# sourceMappingURL=index.js.map