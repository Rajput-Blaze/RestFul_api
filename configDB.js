const mongoose = require('mongoose');
require('dotenv').config();
const mongoDb_password = process.env.DB_password;
const uri = `mongodb+srv://Vishwajeet:${mongoDb_password}@cluster0.inh1w.mongodb.net/<dbname>?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('database connected sucessfull....'))
  .catch((Error) => console.log(Error));

module.exports = mongoose;
