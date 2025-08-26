const AppError = require('./../utils/AppError');

 const handleCastErrorDB = err => {
     const msg = `Invalid ${err.path} : ${err.value}`
     return new AppError(msg, 400)
 };

 const handleDuplicateDB = err => {
    const { errmsg } = err.errorResponse;
    const duplicateValue = errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    const msg = `Someone using this name ${duplicateValue} please use other!`;
    return new AppError(msg, 400);
}

const handleValidatorError = err => {
    const arrMsg = Object.values(err.errors).map(el => el.message);
    const msg = `Invalid input data : ${arrMsg.join('. ')}`;
    return new AppError(msg, 400);
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        err,
        message: err.message,
        stack: err.stack
    });
};
const sendErrorProd = (err, res) => {
    if(err.isOperational){
        res.status(err.statusCode).json({
          status: err.status,
          message: err.message,
        })
    }else{
        console.error('Error 🐣', err);
        res.status(500).json({
            status: 'error',
            message: 'something went very wrong!'
        })
    }
};





module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    if(process.env.NODE_ENV === 'developement'){
        sendErrorDev(err, res);
    }else if(process.env.NODE_ENV === 'production'){
        let error = { ...err};
         if(error.kind === 'ObjectId' || err.name === 'CastError') error = handleCastErrorDB(error);
         else if(error.code === 11000) error = handleDuplicateDB(error);
         else if(error._message === 'Product validation failed') error = handleValidatorError(error)
         sendErrorProd(error, res);
    }
   
}