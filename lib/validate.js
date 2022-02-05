class Validate {
  /**
   * @example
   * const object = { foo: { bar: { message: 'Hello!' } } }
   * const isValid = Validate.isValid(object, ['foo', 'foo.bar.message'])
   * console.log(isValid) // returns true
   *
   * @param {object} object Accepts an object schema.
   * @param {string[]} fields Accepts string array. It is used to loop provided object and validate fields.
   */
  static isValid(object, fields) {
    const hasFields = fields && Array.isArray(fields) && fields.length > 0
    const hasObject =
      object && typeof object === 'object' && Object.keys(object).length > 0
    if (!hasFields || !hasObject) return false

    return fields.every((field) => {
      const splitedFields = field.split('.')
      const [splicedField] = splitedFields.splice(0, 1)
      const joinedFields = splitedFields.join('.')

      const existsMoreFields = !!joinedFields
      const existsFieldInObject = splicedField in object

      if (existsFieldInObject && existsMoreFields) {
        return Validate.isValid(object[splicedField], [joinedFields])
      }

      return existsFieldInObject && !existsMoreFields
    })
  }
}

module.exports = Validate