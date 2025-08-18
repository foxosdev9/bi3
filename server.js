require('dotenv').config({path: './config.env', debug: false});
const app = require('./app');
const mongoose = require('mongoose');

mongoose
.connect(process.env.MONGODB_ATLAS)
.then(db => console.log('DATABASE CONNECTED :)'))
.catch(err => console.log(err));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`SERVER RUN AT: ${PORT}`)
});