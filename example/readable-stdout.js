/* yarn example/readable-stdout.js */
import whichStream from '../src'
import { Readable } from 'stream';

(async () => {
  const readable = new Readable({
    read() {
      this.push(`
> Use microwave to quickly steam your veggies:
place in a bowl, add a few tablespoons of water,
cover and cook in 3 to 5 minutes increments.
`.trim()
      )
      this.push(null)
    },
  })
  await whichStream({
    readable,
    destination: '-',
  })
})()
