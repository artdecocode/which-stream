import { debuglog } from 'util'

const LOG = debuglog('which-stream')

/**
 * A small Node.js library to determine which stream to use.
 * @param {Config} config Configuration object.
 * @param {string} config.type The type.
 */
export default async function whichStream(config = {}) {
  const {
    type,
  } = config
  LOG('which-stream called with %s', type)
  return type
}

/**
 * @typedef {Object} Config
 * @property {string} type The type.
 */
