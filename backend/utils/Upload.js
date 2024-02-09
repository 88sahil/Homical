const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name:"dho1k0k5g",
    api_key:'881525287337586',
    api_secret:"eyEHktdeOL8o-Dvu6WM0jSMJwjQ"
})

const cloudupload = async(path)=>{
    try{
        if(!path) return null;
        let response= await cloudinary.uploader.upload(path,{
            folder:'Photos',
            resource_type:'auto'
        })
        return response
    }catch(err){
        return err
    }
}
const clouddelete = async(id)=>{
    try{
        if(!id) return null;
        const response = await cloudinary.uploader.destroy(id)
    }catch(err){
        return err
    }
}

module.exports = {clouddelete,cloudupload}