const { convertLocalDtcFile, EVENTS, RawFormatNormalizerTransform  } = require('./build/src/index')

const log = console.log
const error = console.error

async function main(filepath) {
  const transformer = new RawFormatNormalizerTransform();

  let i = 0;
  let start = 0;
  transformer.on('data', () => {
    if (i === 0) start = Date.now();
    i++;
    if (i % 100000 === 0) {
      const linesPerSecond = 100000 / (Date.now() - start) * 1000;
      const memory = process.memoryUsage().heapUsed / 1024 / 1024;
      log(`${i} -> ${linesPerSecond.toFixed(2)} lines/s. Mem: ${memory.toFixed(2)}mb`)
    }
  })
  try {
    const start = Date.now()
    const result = await convertLocalDtcFile(filepath, Date.now() + 'out.txt', true, transformer );
    log('End time ', Date.now() - start)
    log('result', JSON.stringify(result))
  } catch(e) {
    error('error converting', e);
  }
  return 'main::end'
}

if (require.main === module) {
  main(...process.argv.slice(2)).then(r => log(r)).catch(e => error('uncontrolled error:', e))
}
