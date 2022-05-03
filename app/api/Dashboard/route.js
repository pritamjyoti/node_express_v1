const express = require('express');
const router = express();
const loginController= require('./DashboardController');
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'-' +file.originalname.replaceAll(/\s/g,''))
    }
  })
  
  const upload = multer({ storage: storage })

router.post('/user_image',[upload.single('file')],loginController.user_image);
//router.post('/user_image',upload.fields([{name:"file",maxCount:2},{name:"file2",maxCount:3}]),loginController.user_image);
router.get('/user',loginController.user);


 module.exports=router;

