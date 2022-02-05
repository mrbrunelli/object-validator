const lib = require('./lib')

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

const makeSut = () => lib

describe('validate', () => {
  /**
   * @type {lib}
   */
  let sut
  let objectStub

  beforeEach(() => {
    sut = makeSut()
    objectStub = makeObjectStub()
  })

  test('should return true if provided fields match with object', () => {
    const isValid = sut.validate(objectStub, [
      'status',
      'data.status',
      'data.responseBody.entities.entity'
    ])
    expect(isValid).toBeTruthy()
  })
})
