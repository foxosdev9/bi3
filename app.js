const express = require('express');
const morgan = require('morgan');
const app = express();

// Routes
const userRouter = require('./routes/userRouter');


app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/users', userRouter);

module.exports = app;
