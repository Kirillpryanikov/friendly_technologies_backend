const controllers = require('./Controllers');
const models = require('./Models');
const schemas = require('./ValidationSchemas');
const middlewares = require('./Middlewares');

console.log({
   controllers: controllers,
   middlewares: middlewares,
   models: models,
   schemas: schemas
});