const mongoose = require('mongoose');
const { DB_CONNECTION } = require('./config');
const ModelTest = require('../models/ModelTest'); 

mongoose.connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', async () => {
  console.log('DB connected!');
});

module.exports = db;
