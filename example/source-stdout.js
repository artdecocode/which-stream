/* yarn example/source-stdout.js */
import whichStream from '../src'

(async () => {
  await whichStream({
    source: 'example/zinc.txt',
    destination: '-',
  })
})()
