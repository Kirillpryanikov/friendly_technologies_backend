const User = require('@model/user');
const bcrypt = require('bcrypt');

const Joi = require('joi');
const UserSchemas = require('@schema/UserSchema');

const jwt = require('jsonwebtoken');
class UserController {

    constructor() {}

    login(Request, Response) {
      Joi.validate(Request.body,UserSchemas.login,function(Error,Data){
  			if(!Error)
  			{
  				User.findOne({email:Data.email}).then( async user => {


  					let verified = await bcrypt.compare(Request.body.password, user.password);

  					if(verified)
  					{
  						var token = jwt.sign({
  							name:user.name,
  							id:user.id,
  							email:user.email,
  						},process.env.JWT_KEY);

  						Response.send({success:true, token: token});

  					}else{
  						Response.status(400);
  						Response.send({success:false,error:'Invalid password'});
  					}

  				})
  				.catch( Error => {
  					Response.status(400);
  					Response.send({success:false,error:Error.message})
  				});
  			}else{
  				Response.status(400);
  				Response.send({success:false,error:Error.error.details[0].message})
  			}
  		});
    }

    register(Request, Response) {
      Joi.validate(Request.body,UserSchemas.register,function(Error,Data){
        if(!Error)
        {
          var hash = bcrypt.hashSync(Data.password, Number(process.env.SALT_ROUNDS));

          let UserData = Data;
          UserData.password = hash;

          User.create(UserData).then( user => {

            var token = jwt.sign({
              name:user.name,
              id:user.id,
              email:user.email,
            },process.env.JWT_KEY);

            Response.send({success: true,token: token});

          }).catch(Error => {
            Response.status(400);

            if(Error.code == 11000) {
              Response.send({success: false, error: 'This email are already used'});
            } else {
              Response.send({success: false,error: Error.message});
            }
          });

        }else{
          Response.status(400);
          Response.send({success: false,error: Error.details[0].message});
        }
      });
    }

    getUsers(Request, Response) {
      User.find().then(users => {
          Response.send(users);
      });
    }
}

module.exports = new UserController();
