
const loginService= require('./DashboardServices');
const {validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
class LoginController {
    constructor() { }
  
  async user(req, res) { 
    const result= await loginService.user(req.body);
    return res.status(StatusCodes.OK).send({status:1,msg:"","data":result});
   
 }
 async user_image(req, res) { 
  const result= await loginService.user_image(req);
  return res.status(StatusCodes.OK).send({status:1,msg:"","data":[]});
 
}
  
  
  
  }
  
  module.exports = new LoginController();