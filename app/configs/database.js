const mongoose = require('mongoose');

const dbURI = process.env.DB_CONNECTION_STRING

mongoose.connect(dbURI,
  {
    // useCreateIndex: true
    // useNewUrlParser: true, 
    // useUnifiedTopology: true
  }
);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Database Connection Error:', err);
});

db.once('open', () => {
  console.log('Succesfully connected');
});


module.exports = db;
