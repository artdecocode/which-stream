/* yarn example/source-destination.js */
import whichStream from '../src'
import { createReadStream } from 'fs'

(async () => {
  const source = 'example/millet.txt'
  const destination = 'example/millet-out.txt'
  await whichStream({
    source,
    destination,
  })
  // verify
  const rs = createReadStream(destination)
  rs.pipe(process.stdout)
})()
