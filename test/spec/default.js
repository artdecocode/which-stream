import { equal, ok } from 'zoroaster/assert'
import Catchment from 'catchment'
import Context from '../context'
import whichStream from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'reads a source'({ FIXTURE: source, readFixture }) {
    const expected = await readFixture()
    const writable = new Catchment()
    await whichStream({
      source,
      writable,
    })
    const res = await writable.promise
    equal(res, expected)
  },
}

export default T
