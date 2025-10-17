const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const globalErrorHandler = require('./controllers/errorController')
const AppError = require('./utils/AppError');
const cookieParser = require('cookie-parser');

// Routes
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const messageRouter = require('./routes/messageRouter');
const reelsRouter = require('./routes/reelsRouter');

if(process.env.NODE_ENV === 'developement') app.use(morgan('dev'));
//"https://bi3-morocco.netlify.app"
app.use(express.json());
app.use(cookieParser());

app.use(cors(
    { origin: process.env.NODE_ENV === 'developement' ? true : "https://ecommerce-bi3.netlify.app", 
      credentials: true 
}));
app.use(express.urlencoded({extended: false}));



app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/messages', messageRouter);
app.use('/api/v2/reels', reelsRouter);


app.get('/favicons', (req, res) => res.status(204));
app.get('/', (req, res) => { res.send('<h1>WELCOME TO BI3 API 😂</h1>')})

app.all("/{*any}", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    // const err = new Error(`Can't find ${req.originalUrl} on this server`);
    // err.statusCode = 404;
    // err.status = 'fail';
    // next(err);
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on this server`
    // })
});

app.use(globalErrorHandler);

module.exports = app;
