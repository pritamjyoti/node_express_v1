const { StatusCodes } = require('http-status-codes');
const { date } = require('joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function authToken(req, res, next) {
  // console.log("Request Params", req.baseUrl, req.path);
  const reqUrl = req.baseUrl + req.path;
  // console.log(reqUrl);
  const token =
    req.body.token || req.headers["token"];
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).send({ "status": 0, "msg": "A token is required for authentication" });
  }
  try {
    await jwt.verify(token,process.env.JWT_SECRET_KEY, async (err, payload) => {
      if (err) {
        return res.status(401).send({ "status": 0, "msg": "Invalid Token" });
      }
      if (payload) {
       
       const { exp: tokenExpiry } = payload;
       const currentDate = new Date();
       const expireDate = new Date(tokenExpiry * 1000);
       if (expireDate < currentDate) {
         console.log(tokenExpiry, currentDate);
         return res.status(StatusCodes.UNAUTHORIZED).send({ "status": 0, "msg": "Token Expired" });
       }
       req.body.user_id= payload.id;
       req.user_id= payload.id;

       
      }

    });

  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).send({ "status": 0, "msg": "Invalid Token" });
  }
  return next();
}
module.exports = authToken;
