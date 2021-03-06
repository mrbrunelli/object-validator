import Validate from './validate'
import { IValidate } from './validate.types'

const makeObjectStub = () => {
  return {
    status: 200,
    data: {
      serviceName: 'DatasetSP.save',
      error: null,
      status: '1',
      pendingPrinting: false,
      transactionId: '6788329C5763C2982A9537E6DD1D122D',
      responseBody: {
        total: 0,
        entities: {
          entity: {
            data: ''
          }
        }
      }
    }
  }
}

const makeSut = () => new Validate()

describe('validate', () => {
  let sut: IValidate
  let objectStub: object

  beforeEach(() => {
    sut = makeSut()
    objectStub = makeObjectStub()
  })

  test('should return true if provided fields match with object', () => {
    const isValid = sut.isValid(objectStub, [
      ['status'],
      ['data.status'],
      ['data.responseBody.entities.entity']
    ])
    expect(isValid).toBeTruthy()
  })

  test('should return true if repeated fields is provided to math with object', () => {
    const isValid = sut.isValid(objectStub, [
      ['data.status'],
      ['data.status'],
      ['data.status']
    ])
    expect(isValid).toBeTruthy()
  })

  test('should return false if provided fields dont exists in object', () => {
    const isValid = sut.isValid(objectStub, [['invalid'], ['invalid.invalid']])
    expect(isValid).toBeFalsy()
  })

  test('should return false if provided field is empty', () => {
    const isValid = sut.isValid(objectStub, [])
    expect(isValid).toBeFalsy()
  })

  test('should return false if provided object is empty', () => {
    const isValid = sut.isValid({}, [['any']])
    expect(isValid).toBeFalsy()
  })

  test('should return false if a unique field of provided fields not exists in object', () => {
    const isValid = sut.isValid(objectStub, [
      ['status'],
      ['data.responseBody.total'],
      ['invalid']
    ])
    expect(isValid).toBeFalsy()
  })

  test('should calls isValid 4x with correctly params', () => {
    const spy = jest.spyOn(sut, 'isValid')
    sut.isValid(objectStub, [
      ['status'],
      ['data.status'],
      ['data.responseBody.total']
    ])
    expect(spy).toBeCalledTimes(4)
    expect(spy).toBeCalledWith(objectStub, [
      ['status'],
      ['data.status'],
      ['data.responseBody.total']
    ])
  })

  test('should return true if provided field value match with object value', () => {
    const isValid = sut.isValid(objectStub, [
      ['status', 200],
      ['data.status', '1'],
      ['data.error', null],
      ['data.pendingPrinting', false],
      ['data.responseBody.total', 0],
      ['data.responseBody.entities.entity.data', '']
    ])
    expect(isValid).toBeTruthy()
  })

  test('should return false if provided field value dont match with object value', () => {
    const isValid = sut.isValid(objectStub, [['status', 400]])
    expect(isValid).toBeFalsy()
  })

  test('should return false if 1 of 3 provided field value dont match with object value', () => {
    const isValid = sut.isValid(objectStub, [
      ['status', 200],
      ['data.status', '1'],
      ['data.responseBody.total', 'wrong']
    ])
    expect(isValid).toBeFalsy()
  })

  test('should return false if provided field value is empty string, 0 or null and dont match with object value', () => {
    const isValid = sut.isValid(objectStub, [
      ['status', ''],
      ['status', 0],
      ['status', null],
      ['status', false]
    ])
    expect(isValid).toBeFalsy()
  })
})
