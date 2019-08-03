/**
 * @fileoverview
 * @externs
 */

/* typal types/index.xml externs */
/** @const */
var _whichStream = {}
/**
 * The configuration object.
 * @record
 */
_whichStream.Config
/**
 * The path to a source file from which to read data.
 * @type {string|undefined}
 */
_whichStream.Config.prototype.source
/**
 * An optional input stream, if the `source` is not given.
 * @type {(!stream.Readable)|undefined}
 */
_whichStream.Config.prototype.readable
/**
 * The path to an output file. If `-` is given, `process.stdout` will be used. If the path of the input stream is the same as of the output one, the result will be first written to the memory, and only then to the destination file. Moreover, when used with the `readable` specified to overwrite the file from which data is originally read from, the `source` should also be passed.
 * @type {string|undefined}
 */
_whichStream.Config.prototype.destination
/**
 * A stream into which to pipe the input stream, if `destination` is not given.
 * @type {(!stream.Writable)|undefined}
 */
_whichStream.Config.prototype.writable
