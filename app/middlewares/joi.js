const { StatusCodes } = require('http-status-codes');

const joi = (schema, type) => (req, res, next) => {
  try {
    let error = null;
    if (type) {
      ({ error, value } = schema.validate(req.params));
      req.params = value;
    } else {
      ({ error, value } = schema.validate(req.body, { abortEarly: false }));
      req.body = value;
    }
    if (error) {
      let massErrorObject = {};
      for (let singleError of error.details) {
        let errorMessages = [];
        if (massErrorObject.hasOwnProperty(singleError.context.label)) {
          massErrorObject[singleError.context.label].push(singleError.message);
        } else {
          errorMessages.push(singleError.message);
          massErrorObject[singleError.context.label] = errorMessages;
        }
      }
      return res.send({
        status:StatusCodes.OK,
        error: massErrorObject,
        message: 'Data is not valid'
      });
    }
    if (!next) return;
    next();
  } catch (ex) {
    console.log(ex);
    res.send({
      
      error: ex,
    });
  }
};

module.exports = {joi};
