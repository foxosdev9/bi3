const express = require('express');
const morgan = require('morgan');
const app = express();

// Routes
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

if(process.env.NODE_ENV === 'developement') app.use(morgan('dev'));

app.use(express.json());

app.get('/favicons', (req, res) => res.status(204));
app.get('/', (req, res) => { res.send('<h1>WELCOME TO BI3 API 😂</h1>')})

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

module.exports = app;
