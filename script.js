const { convertLocalDtcFile, EVENTS, RawFormatNormalizerTransform  } = require('./build/src/index')

const log = console.log
const error = console.error

async function main(filepath) {
  const transformer = new RawFormatNormalizerTransform();
  try {
    const start = Date.now()
    const result = await convertLocalDtcFile(filepath, Date.now() + 'out.txt', false, transformer);
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