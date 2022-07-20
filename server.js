
const app = require('./app/config/app');
const process = require('process');
require('dotenv').config();

const PORT = process.env.PORT || 8081;
process.on('uncaughtException', (error, source) => {
	console.log(source);
 });
var server = app.listen(PORT, function () {
	var host = server.address().address
	var port = server.address().port
	console.log(`HTTP Server listning on port ${PORT}`);
 })