const Validate = require('./lib')

const makeObjectStub = () => {
  return {
    status: 200,
    data: {
      serviceName: 'DatasetSP.save',
      error: '',
      status: '1',
      pendingPrinting: 'false',
      transactionId: '6788329C5763C2982A9537E6DD1D122D',
      responseBody: {
        total: '1',
        entities: {
          entity: {}
        }
      }
    }
  }
}

const makeSut = () => Validate

describe('validate', () => {
  /**
   * @type {Validate}
   */
  let sut
  let objectStub

  beforeEach(() => {
    sut = makeSut()
    objectStub = makeObjectStub()
  })

  test('should return true if provided fields match with object', () => {
    const isValid = sut.isValid(objectStub, [
      'status',
      'data.status',
      'data.responseBody.entities.entity'
    ])
    expect(isValid).toBeTruthy()
  })

  test('should return true if repeated fields is provided to math with object', () => {
    const isValid = sut.isValid(objectStub, [
      'data.status',
      'data.status',
      'data.status'
    ])
    expect(isValid).toBeTruthy()
  })

  test('should return false if provided fields dont exists in object', () => {
    const isValid = sut.isValid(objectStub, ['invalid', 'invalid.invalid'])
    expect(isValid).toBeFalsy()
  })

  test('should return false if provided field is empty', () => {
    const isValid = sut.isValid(objectStub)
    expect(isValid).toBeFalsy()
  })

  test('should return false if provided object is empty', () => {
    const isValid = sut.isValid({}, ['any'])
    expect(isValid).toBeFalsy()
  })

  test('should return false if a unique field of provided fields not exists in object', () => {
    const isValid = sut.isValid(objectStub, [
      'status',
      'data.responseBody.total',
      'invalid'
    ])
    expect(isValid).toBeFalsy()
  })

  test('should calls isValid 4x with correctly params', () => {
    const spy = jest.spyOn(sut, 'isValid')
    sut.isValid(objectStub, [
      'status',
      'data.status',
      'data.responseBody.total'
    ])
    expect(spy).toBeCalledTimes(4)
    expect(spy).toBeCalledWith(objectStub, [
      'status',
      'data.status',
      'data.responseBody.total'
    ])
  })
})
