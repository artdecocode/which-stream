/* yarn example/readable-destination-overwrite.js */
import whichStream from '../src'
import { createReadStream } from 'fs'
import { Transform } from 'stream'

(async () => {
  const source = 'example/onions.txt'
  const readable = new Transform({
    transform(data, encoding, next) {
      const d = `${data}`.replace(
        /Modified: (.+)/m,
        `Modified: ${new Date().toDateString()}`,
      )
      this.push(d)
      next()
    },
  })
  const rs = createReadStream(source)
  rs.pipe(readable)
  await whichStream({
    source,
    readable,
    destination: source,
  })
  // verify
  const vrs = createReadStream(source)
  vrs.pipe(process.stdout)
})()
