require('module-alias/register');
require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

if(process.env.DB_CONNECTION !== '')
{
    require('@model/connection');
}

app.use(function (Request, Response, next)
{
    Response.setHeader('Access-Control-Allow-Origin', '*');
    Response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    Response.setHeader('Access-Control-Allow-Headers', '*');
    Response.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(require('./routes/web.js'));

app.listen(process.env.PORT, function(err) {
    if(!err) {
        console.log(`App is running on ${process.env.PORT} port`)
    }
});
