import Catchment from 'catchment'
import { createWriteStream, createReadStream } from 'fs'
import { Writable } from 'stream'

/**
 * Handles the flow of streams, and awaits for them to complete. The input can be specified either as a string with the `source` property, or as as stream with the `readable`. The output can also be given either as a string with the `destination`, or as a stream with the `writable`. If destination is passed as the `-`, the output becomes `process.stdout`.
 * @param {!_whichStream.Config} config The configuration object.
 */
async function whichStream(config) {
  const {
    source,
    destination,
  } = config
  let { readable, writable } = config

  if (!(source || readable))
    throw new Error('Please give either a source or readable.')
  if (!(destination || writable))
    throw new Error('Please give either a destination or writable.')

  if (source && !readable) readable = createReadStream(source)

  if (destination == '-') {
    readable.pipe(process.stdout)
  } else if (destination) {
    await handleWriteStream(destination, readable, source)
  } else if (writable instanceof Writable) {
    readable.pipe(writable)
    await new Promise((r, j) => {
      writable.on('error', j)
      writable.on('finish', r)
    })
  }
}

const handleWriteStream = async (destination, readable, source) => {
  if (readable.path == destination || source == destination) {
    const { promise } = new Catchment({ rs: readable })
    const res = await promise
    await new Promise((r, j) => {
      // must create writable after reading
      const writable = createWriteStream(destination)
      writable
        .once('error', j)
        .end(res, r)
    })
  } else {
    await new Promise((r, j) => {
      const writable = createWriteStream(destination)
      readable.pipe(writable)
      writable
        .once('error', j)
        .on('close', r)
    })
  }
}

export default whichStream

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').Config} _whichStream.Config
 */
