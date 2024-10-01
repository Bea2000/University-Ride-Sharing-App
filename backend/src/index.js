require('dotenv').config();

const app = require('./app');
const PORT = process.env.PORT || 3000;

const db = require('./models');


db.sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log('Unable to connect to the database', err);  
  }
  );


//app.listen(PORT, () => {
//    console.log(`Server listening on ${PORT}`);
//});