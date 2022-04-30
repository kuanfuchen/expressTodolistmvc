const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
// const DB = process.env.POST_DATABASE.replace('<password>',process.env.DATABASE_KEY);
mongoose.connect('mongodb://localhost:27017/hotel')
  .then(()=>console.log('database connect'))
  .catch(()=>console.log('database disconnect'));