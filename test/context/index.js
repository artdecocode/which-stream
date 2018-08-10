import { resolve } from 'path'
import { debuglog } from 'util'
import Catchment from 'catchment'
import { createReadStream, unlink, rmdir, createWriteStream } from 'fs'
import ensurePath from '@wrote/ensure-path'

const LOG = debuglog('which-stream')

const FIXTURE = resolve(__dirname, '../fixture')
const TEMP = resolve(__dirname, '../temp')

const unlinkPromise = async (path) => {
  await new Promise((r) => {
    unlink(path, r)
  })
}

/**
 * A testing context for the package.
 */
export default class Context {
  async _init() {
    await ensurePath(this.destination)

    const expected = await this.readFixture()
    this.expected = expected

    await this.write(expected, this.sameSource)
    // const s = await this.read(this.sameSource)
    // equal(expected, s)
  }
  async _destroy() {
    unlinkPromise(this.destination)
    unlinkPromise(this.sameSource)
    await new Promise((r) => {
      rmdir(TEMP, r)
    })
  }
  get destination() {
    return resolve(TEMP, 'test.txt')
  }
  /**
   * Path to the fixture file.
   */
  get source() {
    return resolve(FIXTURE, 'test.txt')
  }
  /**
   * Path to the file which can be used as the same source.
   */
  get sameSource() {
    return resolve(TEMP, 'same-source.txt')
  }
  get SNAPSHOT_DIR() {
    return resolve(__dirname, '../snapshot')
  }
  get writable() {
    const writable = new Catchment()
    return writable
  }
  get readable() {
    const readable = createReadStream(this.source)
    return readable
  }
  get sameReadable() {
    const readable = createReadStream(this.sameSource)
    return readable
  }
  get sameWritable() {
    const writable = createWriteStream(this.sameSource)
    return writable
  }
  async readFixture() {
    const f = await this.read(this.source)
    return f
  }
  async readTemp() {
    const t = await this.read(this.destination)
    return t
  }
  async readSameTemp() {
    const t = await this.read(this.sameSource)
    return t
  }
  async read(path) {
    const rs = createReadStream(path)
    const { promise } = new Catchment({
      rs,
    })
    const res = await promise
    return res
  }
  async write(res, path) {
    await new Promise((r, j) => {
      const ws = createWriteStream(path)
      ws
        .once('error', j)
        .end(res, r)
    })
  }
}
