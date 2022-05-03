const expressValidator = require('express-validator');
const {PrismaClient}= require('@prisma/client');
const {user,user_image}= new PrismaClient();
const jwt = require('jsonwebtoken');
const DB = require('../../middlewares/mysql_db');
  
const { encrypt, decrypt }  = require('../../config/crypto');
require('dotenv').config();


class LoginServices {
    constructor() { }
  
  
    async register(InputData) {
      const password = encrypt(InputData.password);
      console.log(password);
     const insertdata={"name":InputData.name,"email":InputData.email,"phone":InputData.phone,"password":password};
     const result = await user.create({data:insertdata});
      return {"status":1};
    }
    async login(InputData) {
       let resdata={"status":0,"msg":"Enter Correct Crediential","token":"","data":{}};
       const pwd = encrypt(InputData.password);
      let result = await user.findFirst({select:{id:true,name:true,email:true,phone:true,password:true},where:{email:InputData.email}});
      
      if(result){
         result.phone = result.phone.toString()
         if(InputData.password == await decrypt(result.password) ){
            delete result.password;
            const token=await jwt.sign(result, process.env.JWT_SECRET_KEY,{expiresIn: "20d"});
            resdata={status:1,msg:"Loged In Successfully",token:token,"data":result};
         }else{
            resdata={status:0,msg:"Enter Correct Password",token:"",data:{}};
         }
         
      }
      return resdata;
    }

  }
  
  module.exports = new LoginServices();