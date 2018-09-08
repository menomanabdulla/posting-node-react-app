const jwt = require('jsonwebtoken');

const authenticates = (req,res,next)=>{
    const token = (req.headers.authorization).split(' ')[1]
   // console.log(req.headers)
    //console.log(token)

    if (token) {
        jwt.verify(token, 'SECRET', function(err, decoded) {
          if (err) {
            res.status(403).json({
              success: false,
              message: 'Failed to authenticate token.'
            });
          } else {
            res.locals = decoded;
            next();
          }
        });
      } else {
        res.status(403).json({
          success: false,
          message: 'No token provided.'
        });
      }
}

module.exports = authenticates