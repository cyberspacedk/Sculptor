const jwt = require('jsonwebtoken');

const authCheck = (req,res,next)=>{
// console.log(req);
// поучаем токен из заголовков запроса
let userToken = req.headers['x-access-token'] || req.headers['authorization']; 

if(userToken.startsWith('Bearer')){
  userToken = userToken.slice(7, userToken.length);
}

if(userToken){
  jwt.verify(userToken , 'secret-word', (err, decoded)=>{
    if(err) {
      return res.json({success: false, message: 'Token is not valid'})
    }else{
      res.json({decoded: decoded})
      req.decoded = decoded;
      next();
    }
  })
  }  
}

module.exports = authCheck;