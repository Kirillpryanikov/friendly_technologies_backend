const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection with database was established');
});

module.exports = db;
