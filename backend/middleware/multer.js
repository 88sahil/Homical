const multer = require('multer')
const storage = multer.diskStorage({
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({
    storage
}).single('profile')
const multiUpload = multer({
    storage
}).array('photos',10)
module.exports = {upload,multiUpload}