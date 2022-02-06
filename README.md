# Object Validator

A Javascript object validator for tiny schemas.

[![NPM](https://nodei.co/npm/@mrbrunelli/object-validator.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@mrbrunelli/object-validator/)

![Test](https://github.com/mrbrunelli/object-validator/actions/workflows/test.yml/badge.svg)

## Get started

```sh
 yarn add @mrbrunelli/object-validator
```

#### How to use

```js
const Validate = require('@mrbrunelli/object-validator')

const objectExample = {
  foo: {
    bar: {
      message: 'Hello!'
    }
  }
}

const isValid = Validate.isValid(objectExample, [
  ['foo'],
  ['foo.bar.message', 'Hello!']
])
console.log(isValid) // returns true
```

#### Why

Validating multiple fields can be very tiring in old Node versions.

```js
  // Work only Node 14 or >
  if (objectExample?.foo?.bar?.message === 'Hello!') // anything...
```

Node 12 require massive validations.

```js
  if (objectExample && objectExample.foo && objectExample.foo.bar && objectExample.foo.bar.example === 'Hello!') // anything...
```

In this case, using a validator is better and safe.

```js
  if (Validator.isValid(objectExample, [['foo.bar.example', 'Hello!']])) // anything...
```

Now imagine validating multiple fields and values ​​from a single object in a old version of Node. Very tiring and verbose.
