import { IValidate, IObject, IFields } from './validate.types'

export default class Validate implements IValidate {
  isValid(object: IObject, fields: IFields): boolean {
    if (!this.isValidProps(object, fields)) return false

    return fields.every(([field, value]) => {
      const splitedFields = field.split('.')
      const [splicedField] = splitedFields.splice(0, 1)
      const joinedFields = splitedFields.join('.')

      const existsValue = value !== undefined
      const existsMoreFields = !!joinedFields
      const existsFieldInObject = splicedField in object

      if (existsFieldInObject && existsMoreFields) {
        return this.isValid(object[splicedField], [[joinedFields, value]])
      }

      const isNecessaryToCompareValues = !existsMoreFields && existsValue
      if (isNecessaryToCompareValues) return value === object[splicedField]

      return existsFieldInObject && !existsMoreFields
    })
  }

  private isValidProps(object: IObject, fields: IFields) {
    const hasFields = fields && Array.isArray(fields) && fields.length > 0
    const hasObject =
      object && typeof object === 'object' && Object.keys(object).length > 0
    return hasObject && hasFields
  }
}
