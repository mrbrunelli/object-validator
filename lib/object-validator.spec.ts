import { Validator } from './object-validator.types'
import { ObjectValidator } from './object-validator'
import mainObjectValidator from '../'

class PayloadBuilder {
  private payload = {
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

  static aPayload() {
    return new PayloadBuilder()
  }

  private reset() {
    this.payload = {} as any
  }

  setStatus(s: any) {
    this.payload.status = s
    return this
  }

  setData(key: any, value: any) {
    this.payload.data[key] = value
    return this
  }

  build() {
    const payload = this.payload
    this.reset()
    return payload
  }
}

describe('ObjectValidator', () => {
  let sut: Validator
  let payload: PayloadBuilder

  beforeEach(() => {
    sut = new ObjectValidator()
    payload = PayloadBuilder.aPayload()
  })

  test('should be valid if fields match with provided payload entries', () => {
    const p = payload.build()

    const isValid = sut.isValid(p, [
      ['status'],
      ['data.status'],
      ['data.responseBody.entities.entity']
    ])

    expect(isValid).toBeTruthy()
  })

  test('should be valid if fields are repeated and match with provided payload entries', () => {
    const p = payload.build()

    const isValid = sut.isValid(p, [
      ['data.status'],
      ['data.status'],
      ['data.status']
    ])

    expect(isValid).toBeTruthy()
  })

  test('should be invalid if fields not exists in provided payload', () => {
    const p = payload.build()
    const isValid = sut.isValid(p, [['invalid'], ['invalid.field']])
    expect(isValid).toBeFalsy()
  })

  test('should be invalid if fields is not provided', () => {
    const p = payload.build()
    const isValid = sut.isValid(p, [])
    expect(isValid).toBeFalsy()
  })

  test('should be invalid if not provided payload', () => {
    const isValid = sut.isValid({}, [['status']])
    expect(isValid).toBeFalsy()
  })

  test('should be invalid if one of many fields not exists in provided payload', () => {
    const p = payload.build()

    const isValid = sut.isValid(p, [
      ['status'],
      ['data.responseBody.total'],
      ['ivalid.field']
    ])

    expect(isValid).toBeFalsy()
  })

  test('should calls isValid method with correct params', () => {
    const spy = jest.spyOn(sut, 'isValid')
    const p = payload.build()

    sut.isValid(p, [['status'], ['data.status'], ['data.responseBody.total']])

    expect(spy).toHaveBeenCalledTimes(4)
    expect(spy).toBeCalledWith(p, [
      ['status'],
      ['data.status'],
      ['data.responseBody.total']
    ])
  })

  test('should be valid if fields and values match with provided payload', () => {
    const p = payload
      .setStatus(null)
      .setData('error', false)
      .setData('status', ' ')
      .build()

    const isValid = sut.isValid(p, [
      ['status', null],
      ['data.status', ' '],
      ['data.error', false],
      ['data.responseBody.total', 0],
      ['data.responseBody.entities.entity.data', '']
    ])

    expect(isValid).toBeTruthy()
  })

  test('should be invalid if fields and values not match with provided payload', () => {
    const p = payload.setStatus(400).build()
    const isValid = sut.isValid(p, [['status', 200]])
    expect(isValid).toBeFalsy()
  })

  test('should be invalid if one of many fields and values not match with provided payload', () => {
    const p = payload
      .setData('serviceName', 'any service')
      .setData('status', '1')
      .setStatus(200)
      .build()

    const isValid = sut.isValid(p, [
      ['status', 200],
      ['data.status', '1'],
      ['data.serviceName', 'invalid']
    ])

    expect(isValid).toBeFalsy()
  })

  test('should be invalid if value is null and provided payload value is empty string', () => {
    const p = payload.setStatus('').build()
    const isValid = sut.isValid(p, [['status', null]])
    expect(isValid).toBeFalsy()
  })

  test('should be defined', () => {
    expect(mainObjectValidator).toBeDefined()
    expect(mainObjectValidator).toEqual(sut)
    expect(mainObjectValidator.isValid({}, [])).toBeFalsy()
    expect(
      mainObjectValidator.isValid({ foo: 'bar' }, [['foo', 'bar']])
    ).toBeTruthy()
  })
})
