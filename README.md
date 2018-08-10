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
| destination | _string_ | The path to the output file. If `-` is given, `process.stdout` will be used. If the path of the input stream is the same as of the output one, the result will be first written to the memory, and only then to the destination file. | - |
| writable | [_Writable_](#writable) | A stream into which to pipe the input stream, if `destination` is not given. | - |

```js
/* yarn example */
import whichStream from 'which-stream'

(async () => {
  await whichStream()
})()
```

## Copyright

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz
