# uutils

uutils is a small library to help you automatically load libraries into a single namespace. 

## Installation

This module requires ES6.

```sh
$ npm install uutils
```

## Example usage

```js
const uutils = require('uutils');
```

Edit your package.json to select the dependencies to automaticaly load through uutils.

```json
{
  "name": "uutils",
  ...
  "_utils": {
    "uuid": true
  }
}

Now you can access the `uuid` library through uutils.uuid. 