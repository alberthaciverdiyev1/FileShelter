const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/FileShelter';

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
