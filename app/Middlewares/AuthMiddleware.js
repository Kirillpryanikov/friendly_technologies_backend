const jwt = require('jsonwebtoken');
const User = require('@model/user');

class AuthMiddleware {
  auth(Request, Response, next) {
    if (!Request.headers.authorization || Request.headers.authorization === '')
      {
          Response.status(400);
          Response.send({message:'Token does not exist!'});
      }
      else
      {
          let  token = Request.headers.authorization;
          token = token.replace('Bearer ','');
          jwt.verify(token,process.env.JWT_KEY, async function(Error,Decoded){
              if(!Error)
              {
                  let user = await User.findOne(
                      {
                          email:Decoded.email
                      }
                  );

                  if(user)
                  {
                      Request.auth = user;
                      next();
                  }else{
                      Response.status(400);
                      Response.send({success:false,error:'There are no such user founded'});
                  }



              }else{
                  Response.status(400);
                  Response.send({success:false,error:Error});
              }
          });

      }
  }
}

module.exports = new AuthMiddleware();
