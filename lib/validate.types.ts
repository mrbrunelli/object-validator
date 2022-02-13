export interface IValidate {
  isValid(object: IObject, fields: IFields): boolean
}

export type IObject = { [key: string]: any }

export type IFields = Array<[string, any?]>
