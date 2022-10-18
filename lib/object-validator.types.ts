export interface Validator {
  isValid(object: Payload, fields: Fields): boolean
}

export type Payload = { [key: string]: any }

export type Fields = Array<[string, any?]>
