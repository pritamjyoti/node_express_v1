
const loginService= require('./LoginServices');
const {validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
class LoginController {
    constructor() { }
    async login(req, res) {
        res.sendFile(`${dir}login.htm` );
    }
    async register(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
       const result= await loginService.register(req.body);
       return res.status(200).send({status:1,"msg":"data inserted successfully","data":[]});
    }
    async login(req, res) { 
     const result= await loginService.login(req.body);
     res.setHeader('token', result.token ? result.token : null);
     return res.status(StatusCodes.ACCEPTED).send({"status":1,"msg":"Loged In successfully","data":result.data});
  }
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