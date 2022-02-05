# Object Validator

A Javascript object validator for tiny schemas.

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

const isValid = Validate.isValid(objectExample, ['foo', 'foo.bar.message'])
console.log(isValid) // returns true
```
