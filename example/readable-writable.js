/* yarn example/readable-writable.js */
import whichStream from '../src'
import { Readable, Transform } from 'stream';

(async () => {
  const readable = new Readable({
    read() {
      this.push(`
Omega-3 fatty acids boost heart health, lower
triglycerides, and may help in the treatment
and prevention of depression.
`.trim()
      )
      this.push(null)
    },
  })
  const writable = new Transform({
    transform(data, encoding, next) {
      const d = `*${data}*`
      this.push(d)
      next()
    },
  })
  writable.pipe(process.stdout) // to verify
  await whichStream({
    readable,
    writable,
  })
})()
