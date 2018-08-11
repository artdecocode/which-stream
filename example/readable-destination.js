/* yarn example/readable-destination.js */
import whichStream from '../src'
import { createReadStream } from 'fs'
import { Readable } from 'stream';

(async () => {
  const destination = 'example/thiamine-out.txt'
  const readable = new Readable({
    read() {
      this.push(`
Vitamin B1 (Thiamine): essential for proper functioning of
the heart, muscles and nervous system.
`.trim()
      )
      this.push(null)
    },
  })
  await whichStream({
    readable,
    destination,
  })
  // verify
  const rs = createReadStream(destination)
  rs.pipe(process.stdout)
})()
