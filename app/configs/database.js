const mongoose = require('mongoose');

const dbURI = (process.env.IS_PRODUCTION) ? (process.env.DB_CONNECTION_STRING) : (process.env.DB_LOCAL_CONNECTION_STRING)
mongoose.connect(dbURI,
  {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // ssl: true
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
