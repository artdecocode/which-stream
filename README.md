# which-stream

[![npm version](https://badge.fury.io/js/which-stream.svg)](https://npmjs.org/package/which-stream)

`which-stream` is a small Node.js library to pipe an input stream to an output one. It can create filesystem's read and write streams, or use provided ones, as well as piping output to the `stdout`.

```sh
yarn add -E which-stream
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`async whichStream(config: Config)`](#async-whichstreamconfig-config-void)
  * [`Config`](#config)
- [Use Cases](#use-cases)
  * [Source to Destination](#source-to-destination)
  * [Source to Writable](#source-to-writable)
  * [Source to Stdout](#source-to-stdout)
  * [Readable to Destination](#readable-to-destination)
  * [Readable to Destination (Overwriting)](#readable-to-destination-overwriting)
  * [Readable to Writable](#readable-to-writable)
  * [Readable to Stdout](#readable-to-stdout)
- [TODO](#todo)
- [Copyright](#copyright)

## API

The package is available by importing its default function:

```js
import whichStream from 'which-stream'
```

## `async whichStream(`<br/>&nbsp;&nbsp;`config: Config,`<br/>`): void`

The `whichStream` function will determine which streams to use by creating readable and writable streams when source and/or destination are passed as strings, pipe the input to the output, and wait for the output to finish.

`import('stream').Readable` __<a name="readable">`Readable`</a>__

`import('stream').Writable` __<a name="writable">`Writable`</a>__

__<a name="config">`Config`</a>__: Configuration object. Includes `source`, `readable`, `destination` and `writable` properties.

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| source | _string_ | The path to a source file from which to read data. | - |
| readable | [_Readable_](#readable) | An optional input stream, if the `source` is not given. | - |
| destination | _string_ | The path to an output file. If `-` is given, `process.stdout` will be used. If the path of the input stream is the same as of the output one, the result will be first written to the memory, and only then to the destination file. Moreover, when used with the `readable` specified to overwrite the file from which data is originally read from, the `source` should also be passed. | - |
| writable | [_Writable_](#writable) | A stream into which to pipe the input stream, if `destination` is not given. | - |
## Use Cases

Below is the list of possible use cases when `which-stream` package could be used.

### Source to Destination

When the `source` and `destination` are passed, a file is be copied as it is.

```js
/* yarn example/source-destination.js */
import whichStream from 'which-stream'
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
```

```
Millet (gluten-free):
An excellet source of manganese, magnesioum, and phosphorus.
```

### Source to Writable

When the `source` and `writable` are supplied, a stream pushing input text from the source file will be piped into the given output writable stream.

```js
/* yarn example/source-writable.js */
import whichStream from 'which-stream'
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
```

```
BROWN RICE (GLUTEN-FREE):
UNLIKE WHITE RICE, BROWN RICE IS REACH WITH VITAMINS,
MINERALS, FIBRE AND FATTY ACIDS.
```

### Source to Stdout

To print a file to `stdout`, the destination should be set to `-` .

```js
/* yarn example/source-stdout.js */
import whichStream from 'which-stream'

(async () => {
  await whichStream({
    source: 'example/zinc.txt',
    destination: '-',
  })
})()
```

```
ZINC: an often-overlooked essential mineral, zinc is the
most common mineral found in the body after iron.
```

### Readable to Destination

Passing both the `readable` and `destination` properties will ensure that the input stream is written to the destination on the disk.

```js
/* yarn example/readable-destination.js */
import whichStream from 'which-stream'
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
```

```
Vitamin B1 (Thiamine): essential for proper functioning of
the heart, muscles and nervous system.
```

### Readable to Destination (Overwriting)

If `readable`'s data initially comes from the same source as the destination to which it will be written, the `source` property must also be set to make sure that the file is overwritten properly. The stream's data will first be buffered in memory, and upon the readable stream's end it will be released to the destination. This is useful when using transform streams which don't necessary read from the source themselves, but are being piped into by another readable.

```js
/* yarn example/readable-destination-overwrite.js */
import whichStream from 'which-stream'
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
```

```
Buy a bag of onions, chop in food processor, toss into
plastic zip bag, and stow in freezer.
Modified: Sat Aug 11 2018
```

In case the `source` is not passed, the file will become empty.

### Readable to Writable

In the scenario when the `readable` and `writable` are specified, the former will be piped into the latter, and the function's promise will be resolved when the writable finishes.

```js
/* yarn example/readable-writable.js */
import whichStream from 'which-stream'
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
```

```markdown
*Omega-3 fatty acids boost heart health, lower
triglycerides, and may help in the treatment
and prevention of depression.*
```

### Readable to Stdout

When a `readable` stream needs to be output to the `stdout`, the destination should be set to `-`.

```js
/* yarn example/readable-stdout.js */
import whichStream from 'which-stream'
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
```

```markdown
> Use microwave to quickly steam your veggies:
place in a bowl, add a few tablespoons of water,
cover and cook in 3 to 5 minutes increments.
```

## TODO

- [ ] Read a directory as a source.
- [ ] Allow to pipe to `stderr`.

## Copyright

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz
