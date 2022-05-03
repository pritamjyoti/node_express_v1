const Joi = require('joi');

let custom_id = Joi.string().trim().required();

const mobile_no = Joi.string()
  .min(10)
  .max(10)
  .regex(/^(\+\d{1,3}[- ]?)?\d{10}$/)
  .messages({
    'string.pattern.base': `mobile number contains only numbers`,
    'string.min': `mobile number should be 10 in length`,
    'string.max': `mobile number should be 10 in length`
  })
  .required();

const createUser = {
  name: Joi.string().min(3).required(),
  email: Joi.string().min(3).required(),
  password: Joi.string().min(6).required()
}

const updateUser = {
  name: Joi.string().min(3).required(),
  username: Joi.string().min(3).required(),
  role: Joi.string().min(3).required(),
  mobile_no: mobile_no
}
const createRegister = Joi.object().keys({
 
  phone: Joi.string().min(5).required(),
  name: Joi.string().min(3).required(),
  email: Joi.string().min(3).required(),
  password: Joi.string().min(6).required()
});
const loginUser = Joi.object().keys({
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(5).required()
});
const register = Joi.object().keys({
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(5).required()
});

const forgotPassword = {
  username: Joi.string().min(3).required(),
  role: Joi.string().min(3).required(),
}


const schema = {
  registerUser: Joi.object().keys({
    user_details: createUser
  }).unknown(true),
  createRegister,
  loginUser: loginUser,

  updateUser: Joi.object().keys({
    id: custom_id,
    user_details: updateUser
  }),

  forgotPassword: Joi.object().keys({
    user_details: forgotPassword
  }),

  readUser: Joi.object().keys({
    id: custom_id
  }),

  deleteUser: Joi.object().keys({
    id: Joi.array().items(custom_id).required()
  })
};

module.exports = { schema };