import Catchment from 'catchment'
import {
  createWriteStream,
  createReadStream,
  ReadStream,
  WriteStream,
} from 'fs'
import { Writable } from 'stream'

const createWritable = (destination) => {
  if (destination == '-') return process.stdout
  const ws = createWriteStream(destination)
  return ws
}

/**
 * Handles the flow of streams, and awaits for them to complete. The input can be specified either as a string with the `source`, or as as stream with `readable`. The output can also be given either as a string with the `destination`, or as a stream with the `writable`. If destination is passed as the `-`, the output becomes `process.stdout`.
 * @param {Config} config Configuration object. Includes `source`, `readable`, `destination` and `writable` properties.
 * @param {string} [config.source] The path to a source file from which to read data.
 * @param {Readable} [config.readable] An optional input stream, if the `source` is not given.
 * @param {string} [config.destination] The path to the output file. If `-` is given, `process.stdout` will be used. If the path of the input stream is the same as of the output one, the result will be first written to the memory, and only then to the destination file.
 * @param {Writable} [config.writable] A stream into which to pipe the input stream, if `destination` is not given.
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

  if (source) readable = createReadStream(source)
  if (destination) writable = createWritable(destination)

  if (destination == '-') {
    readable.pipe(writable)
  } else if (writable instanceof WriteStream) {
    await handleWriteStream(writable, readable)
  } else if (writable instanceof Writable) {
    readable.pipe(writable)
    await new Promise((r, j) => {
      writable.on('error', j)
      writable.on('finish', r)
    })
  }
}

const handleWriteStream = async (writable, readable) => {
  if (readable instanceof ReadStream && readable.path == writable.path) {
    const { promise } = new Catchment({ rs: readable })
    const res = await promise
    await new Promise((r, j) => {
      writable
        .once('error', j)
        .end(res, r)
    })
  } else {
    readable.pipe(writable)
    await new Promise((r, j) => {
      writable
        .once('error', j)
        .on('close', r)
    })
  }
}

/* documentary types/index.xml */
/**
 * @typedef {import('stream').Readable} Readable
 * @typedef {import('stream').Writable} Writable
 *
 * @typedef {Object} Config Configuration object. Includes `source`, `readable`, `destination` and `writable` properties.
 * @prop {string} [source] The path to a source file from which to read data.
 * @prop {Readable} [readable] An optional input stream, if the `source` is not given.
 * @prop {string} [destination] The path to the output file. If `-` is given, `process.stdout` will be used. If the path of the input stream is the same as of the output one, the result will be first written to the memory, and only then to the destination file.
 * @prop {Writable} [writable] A stream into which to pipe the input stream, if `destination` is not given.
 */

export default whichStream