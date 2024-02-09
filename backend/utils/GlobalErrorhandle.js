const AppError = require('./Error')

const handledev = (err,req,res)=>{
    return res.status(err.statuscode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack
    })
}
const GlobalErrorhandle =(err,req,res,next)=>{
    err.statuscode = err.statuscode || 500;
    err.status = err.status || 'error'
    if(process.env.NODE_ENV === "developer"){
        handledev(err,req,res)
    }
    next()
}
module.exports = GlobalErrorhandle