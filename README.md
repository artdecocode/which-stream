# which-stream

[![npm version](https://badge.fury.io/js/which-stream.svg)](https://npmjs.org/package/which-stream)

`which-stream` is a new Node.js npm package. A small Node.js library to determine which stream to use.

```sh
yarn add -E which-stream
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`whichStream(arg1: string, arg2?: boolean)`](#mynewpackagearg1-stringarg2-boolean-void)

## API

The package is available by importing its default function:

```js
import whichStream from 'which-stream'
```

### `whichStream(`<br/>&nbsp;&nbsp;`arg1: string,`<br/>&nbsp;&nbsp;`arg2?: boolean,`<br/>`): void`

Call this function to get the result you want.

```js
/* yarn example */
import whichStream from 'which-stream'

(async () => {
  await whichStream()
})()
```

---

(c) [Art Deco][1] 2018

[1]: https://artdeco.bz
