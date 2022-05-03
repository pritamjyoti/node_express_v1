const router = require('express').Router();
const loginRoute= require('./login/login-route');
const home= require('./Dashboard/route');
const Auth = require('../middlewares/jwtAuth');


router.use('/', loginRoute);
router.use('/home',Auth, home);


 module.exports=router;