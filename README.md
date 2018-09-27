# Friendly Technologies backend

### Start
 - Create an `.env` file from `.env-example` and complete it with yours variables
 - Intall all packages with `npm install`
 - Make sure that your Mongod service is up
 - Run the project with `nodemon` or `pm2`
## API

### Login 
- POST - /api/login
- BODY
  - `email`: String, required,
  - `password`: String,required
- Response Object:
```javascript
{
    "success": Boolean,
    "token": String
}
```
### Register
 - POST - /api/register
 - BODY
   - `name`: String, required,
   - `email`: String, required,
   - `password`: String, required
 - Response Object:
 ```javascript
 {
    "success": Boolean,
    "token": String
 }
 ```
 ### Get users
 - POST - /api/users
 - HEADERS
   - `Authorization`: String (Bearer token)
 - Response Array:
 ```javascript
 [
   {
     "name":String,
     "email":String,
     "password": String,// hashed bcrypt string,
     "createdAt": Date,
     "updatedAt": Date
   },
   ...
 ]
 ```   
