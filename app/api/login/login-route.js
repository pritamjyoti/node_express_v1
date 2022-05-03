const express = require('express');
const router = express();
const loginController= require('./LoginController');
const {register_validate,login_valid} = require('./validator');
const {joi}=require('../../middlewares/joi');
const {schema} = require('./login.validation');
const Auth = require('../../middlewares/jwtAuth');

router.post('/register',[joi(schema.createRegister)],loginController.register);
router.post('/login',[joi(schema.loginUser)],loginController.login);

 module.exports=router;

