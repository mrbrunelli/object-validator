/**
 * @example
 * const object = { foo: { bar: { message: 'Hello!' } } }
 * const isValid = validate(object, ['foo', 'foo.bar.message'])
 * console.log(isValid) // returns true
 *
 * @param {object} object Accepts an object schema.
 * @param {string[]} fields Accepts string array. It is used to loop provided object and validate fields.
 */
const validate = (object, fields = []) => {
  return fields.every((field) => {
    const splitedFields = field.split('.')
    const [splicedField] = splitedFields.splice(0, 1)
    const joinedFields = splitedFields.join('.')

    const existsMoreFields = !!joinedFields
    const existsFieldInObject = splicedField in object

    if (existsFieldInObject && existsMoreFields) {
      return validate(object[splicedField], [joinedFields])
    }

    return existsFieldInObject && !existsMoreFields
  })
}

module.exports = {
  validate
}
