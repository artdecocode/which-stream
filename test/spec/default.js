import { equal } from 'zoroaster/assert'
import { PassThrough } from 'stream'
import Context from '../context'
import whichStream from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'source -> writable'(
    { source, expected, writable }
  ) {
    await whichStream({
      source,
      writable,
    })

    const res = await writable.promise
    equal(res, expected)
  },
  async 'source -> destination'({
    source, destination, expected, readTemp,
  }) {
    await whichStream({
      source,
      destination,
    })

    const temp = await readTemp()
    equal(temp, expected)
  },
  async 'source -> destination (same path)'({
    sameSource: destination, sameSource: source, readSameTemp, expected,
  }) {
    await whichStream({
      source,
      destination,
    })

    const res = await readSameTemp()
    equal(res, expected)
  },
  async 'readable -> writable'({
    expected, writable, readable,
  }) {
    await whichStream({
      readable,
      writable,
    })

    const res = await writable.promise
    equal(res, expected)
  },
  async 'readable -> destination'({
    expected, readTemp, destination, readable,
  }) {
    await whichStream({
      readable,
      destination,
    })

    const res = await readTemp()
    equal(res, expected)
  },
  async 'readable -> destination (same path)'({
    sameReadable: readable, sameSource: destination, readSameTemp, expected,
  }) {
    await whichStream({
      readable,
      destination,
    })

    const res = await readSameTemp()
    equal(res, expected)
  },
  async 'proxy source -> destination (same path)'({
    sameReadable, sameSource: source, sameSource: destination, readSameTemp, expected,
  }){
    const readable = new PassThrough()
    sameReadable.pipe(readable)
    await whichStream({
      source,
      readable,
      destination,
    })

    const res = await readSameTemp()
    equal(res, expected)
  },
}

export default T
