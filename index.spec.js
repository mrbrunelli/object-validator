const { validate } = require('./index')

const responseExample = {
  status: 200,
  data: {
    serviceName: 'DatasetSP.save',
    error: '',
    status: '1',
    pendingPrinting: 'false',
    transactionId: '6788329C5763C2982A9537E6DD1D122D',
    responseBody: {
      total: '1',
      result: [['N']],
      entities: {
        entity: {
          total: {}
        }
      }
    }
  }
}

describe('validate', () => {
  test('should returns true if fields matchs in provided object', () => {
    const isValid = validate(responseExample, [
      'status',
      'data.status',
      'data.responseBody.entities.entity.total'
    ])
    expect(isValid).toBeTruthy()
  })
})
