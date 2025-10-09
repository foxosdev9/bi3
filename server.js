require('dotenv').config({path: './config.env', debug: false});
const app = require('./app');
const mongoose = require('mongoose');

// let url_connection = 
// process.env.MONGODB_ATLAS.replace('<PASSWORD>', process.env.DB_PASSWORD);


// process.env.MONGODB_ATLAS
// 'mongodb://localhost:27017/'
mongoose
.connect(process.env.MONGODB_ATLAS)
.then(db => console.log('DATABASE CONNECTED :)'))
.catch(err => console.log(err));



const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`SERVER RUN AT: ${PORT}`)
});


process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION shuthing down');
    server.close(() => {
      process.exit(1);
    })
});