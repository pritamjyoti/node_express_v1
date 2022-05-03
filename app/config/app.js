const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Logger = require('../middlewares/logger');
const logger = new Logger('app');
const rateLimit = require('express-rate-limit');
const multer = require('multer');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);
app.use(bodyParser.json()); 
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(morgan('short'))
app.use(express.static('../../public'));
app.use('/api',require('../api/route'));


app.get('/test', (req, res) => {
	res.send('hello docker world')
  });
app.use(bodyParser.urlencoded({ extended: true })); 
  module.exports = app;