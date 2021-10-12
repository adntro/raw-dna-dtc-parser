# @adntro/raw-dna-dtc-parser
> DNA file reader (in DTC formats) and parser

[![npm version](https://img.shields.io/npm/v/@adntro/raw-dna-dtc-parser.svg?style=flat-square)](https://www.npmjs.com/package/@adntro/raw-dna-dtc-parser)

## Getting started

Install as a dependency

```
npm i -S @adntro/raw-dna-dtc-parser
```

## Usage

```
const { RawFormatNormalizerTransform, EVENTS } = require('@adntro/raw-dna-dtc-parser')
const split2 = require('split2')
const { createReadStream, createWriteStream } = require('fs')

const rawNormalizer = new RawFormatNormalizerTransform();

createReadStream('genome_test_v5.txt', 'utf-8')  // 23andme file
  .pipe(split2) //line by line
  .pipe(rawNormalizer)
  .pipe(createWriteStream('out.txt'))

rawNormalizer.on(EVENTS.HEADER, header => console.log('File header -> ', header))
rawNormalizer.on(EVENTS.INFO, snpInfo => console.log('File SNP info -> ', snpInfo))
```


## License
[MIT](LICENSE)

---
Made with ❤️ by the Adntro Genetics Developer Team.
> ***NOTE: This is not an official Adntro product.***