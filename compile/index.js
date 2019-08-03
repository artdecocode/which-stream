const __whichStream = require('./which-stream')

/**
 * Handles the flow of streams, and awaits for them to complete. The input can be specified either as a string with the `source` property, or as as stream with the `readable`. The output can also be given either as a string with the `destination`, or as a stream with the `writable`. If destination is passed as the `-`, the output becomes `process.stdout`.
 * @param {!_whichStream.Config} config The configuration object.
 * @param {string} [config.source] The path to a source file from which to read data.
 * @param {!stream.Readable} [config.readable] An optional input stream, if the `source` is not given.
 * @param {string} [config.destination] The path to an output file. If `-` is given, `process.stdout` will be used. If the path of the input stream is the same as of the output one, the result will be first written to the memory, and only then to the destination file. Moreover, when used with the `readable` specified to overwrite the file from which data is originally read from, the `source` should also be passed.
 * @param {!stream.Writable} [config.writable] A stream into which to pipe the input stream, if `destination` is not given.
 */
function whichStream(config) {
  return __whichStream(config)
}

module.exports = whichStream

/* typal types/index.xml closure noSuppress */
/**
 * @typedef {_whichStream.Config} Config `＠record` The configuration object.
 */
/**
 * @typedef {Object} _whichStream.Config `＠record` The configuration object.
 * @prop {string} [source] The path to a source file from which to read data.
 * @prop {!stream.Readable} [readable] An optional input stream, if the `source` is not given.
 * @prop {string} [destination] The path to an output file. If `-` is given, `process.stdout` will be used. If the path of the input stream is the same as of the output one, the result will be first written to the memory, and only then to the destination file. Moreover, when used with the `readable` specified to overwrite the file from which data is originally read from, the `source` should also be passed.
 * @prop {!stream.Writable} [writable] A stream into which to pipe the input stream, if `destination` is not given.
 */
/**
 * @typedef {import('stream').Readable} stream.Readable
 */
/**
 * @typedef {import('stream').Writable} stream.Writable
 */
