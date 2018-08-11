/* yarn example/source-writable.js */
import whichStream from '../src'
import { Transform } from 'stream';

(async () => {
  const source = 'example/brown-rice.txt'
  const writable = new Transform({
    transform(data, encoding, next) {
      const d = `${data}`.toUpperCase()
      this.push(d)
      next()
    },
  })
  writable.pipe(process.stdout) // to verify
  await whichStream({
    source,
    writable,
  })
})()
