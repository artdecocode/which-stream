"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whichStream;

var _util = require("util");

const LOG = (0, _util.debuglog)('which-stream');
/**
 * A small Node.js library to determine which stream to use.
 * @param {Config} config Configuration object.
 * @param {string} config.type The type.
 */

async function whichStream(config = {}) {
  const {
    type
  } = config;
  LOG('which-stream called with %s', type);
  return type;
}
/**
 * @typedef {Object} Config
 * @property {string} type The type.
 */
//# sourceMappingURL=index.js.map