const validate = (object, fields = []) => {
  return fields.every((field) => {
    const splitedFields = field.split(".");
    const [splicedField] = splitedFields.splice(0, 1);
    const joinedFields = splitedFields.join(".");

    const existsFields = !!joinedFields;
    const existsFieldInObject = splicedField in object;

    if (existsFieldInObject && existsFields) {
      return validate(object[splicedField], [joinedFields]);
    }

    return existsFieldInObject && !existsFields;
  });
};

const responseExample = {
  status: 200,
  data: {
    serviceName: "DatasetSP.save",
    error: "",
    status: "1",
    pendingPrinting: "false",
    transactionId: "6788329C5763C2982A9537E6DD1D122D",
    responseBody: {
      total: "1",
      result: [["N"]],
      entities: {
        entity: {
          total: {}
        }
      }
    }
  }
};

const isValid = validate(responseExample, [
  "status",
  "data.status",
  "data.responseBody.entities.entity.total"
]);

console.log(isValid);
