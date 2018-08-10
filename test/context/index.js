import { resolve } from 'path'
import { debuglog } from 'util'
import Catchment from 'catchment'
import { createReadStream } from 'fs'

const LOG = debuglog('which-stream')

const FIXTURE = resolve(__dirname, '../fixture')

/**
 * A testing context for the package.
 */
export default class Context {
  /**
   * Path to the fixture file.
   */
  get FIXTURE() {
    return resolve(FIXTURE, 'test.txt')
  }
  get SNAPSHOT_DIR() {
    return resolve(__dirname, '../snapshot')
  }
  async readFixture() {
    const rs = createReadStream(this.FIXTURE)
    const { promise } = new Catchment({
      rs,
    })
    const res = await promise
    return res
  }
}
