const expressValidator = require('express-validator');
const {PrismaClient}= require('@prisma/client');
const {user,user_image}= new PrismaClient();
const jwt = require('jsonwebtoken');
const DB = require('../../middlewares/mysql_db');
  
const { encrypt, decrypt }  = require('../../config/crypto');
require('dotenv').config();


class LoginServices {
    constructor() { }
  
    async user(InputData){
      //const user_data= DB.query("SELECT * FROM user");
      let user_data= [];
      await DB.query("SELECT * FROM user", (err, rows, fields) => {
         user_data= rows;
       });
       console.log(user_data);
      let result = await user.findFirst({select:{id:true,name:true,email:true,phone:true,password:true,user_image:({select:{image:true}})},where:{id:InputData.user_id}});
      result.phone = result.phone.toString();
      return result;
    }
    async user_image(req){
         const user_id = req.user_id;
         const file =req.file.filename;
         const insertdata={"image":file,"user_id":user_id};
         const result = await user_image.create({data:insertdata});
         return 1;
    }

  
  }
  
  module.exports = new LoginServices();