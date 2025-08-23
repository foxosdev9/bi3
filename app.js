const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// Routes
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

if(process.env.NODE_ENV === 'developement') app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

app.get('/favicons', (req, res) => res.status(204));
app.get('/', (req, res) => { res.send('<h1>WELCOME TO BI3 API 😂</h1>')})



module.exports = app;
