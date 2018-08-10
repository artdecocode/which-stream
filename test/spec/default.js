import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import whichStream from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof whichStream, 'function')
  },
  async 'calls package without error'() {
    await whichStream()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await whichStream({
      type: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T
