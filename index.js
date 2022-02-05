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
