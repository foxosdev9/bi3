require('dotenv').config({path: './config.env', debug: false});
const app = require('./app');
const mongoose = require('mongoose');

let url_connection = 
process.env.MONGODB_ATLAS.replace('<PASSWORD>', process.env.DB_PASSWORD);


mongoose
.connect(url_connection)
.then(db => console.log('DATABASE CONNECTED :)'))
.catch(err => console.log(err));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`SERVER RUN AT: ${PORT}`)
});