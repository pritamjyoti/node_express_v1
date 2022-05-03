const {body,check,validationResult } = require('express-validator');
const {PrismaClient}= require('@prisma/client');
const {user}= new PrismaClient();
const register_validate= [
   body('name').isLength({ min: 5 }).withMessage('Name is required with length greater than 5'),

   body('email').custom(value => {
    return user.findFirst({where:{email:value}}).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
  }).isEmail().withMessage('Enter Valid Email Address'),
   body('phone').isInt().matches(/^[6789]\d{9}$/).withMessage('Enter Valid 10 Digit Mobile Number'),
   body('password').isLength({ min: 5 }).withMessage('ENter Valid Password'),
   body('confirmPasswords').custom((value, { req }) => {
       if (value !== req.body.password) {
         throw new Error('Password confirmation does not match password');
       }
       return true;
     })


   ];
   const login_valid= [
    body('email').isEmail().withMessage('Enter Valid Email Address'),
    body('password').isLength({ min: 5 }).withMessage('ENter Valid Password'),
    ];

module.exports = {register_validate,login_valid};