import React, { useState } from "react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {login} from '../../Store/AuthSlice'
import './Users.scss'
const UpdatePhoto =()=>{
    const user = useSelector(state=>state.auth.UserData);
    const dispatch = useDispatch();
    const [loader,setloader] = useState(false);
    const {handleSubmit,register} = useForm();
    let title=""
    let photo=""
    if(user){
        photo = user.photo;
        title=  user.username
    }
    const uploadPhoto =async(data)=>{
        setloader(true);
       try{
            let res = await axios.post('/api/user/photoupload',{profile:data.profile[0]},{
                withCredentials:true,
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })

            if(res.data){
                dispatch(login(res.data.user));
                setloader(false);
            }
       }catch(err){
            alert(err.response.data.message)
       }
    }
    return(
        <div className="up">
            <img src={photo} alt='profile' title={title}></img>
            <form onSubmit={handleSubmit(uploadPhoto)}>
                <input type="file" accept="image/*" required {...register("profile")}></input>
                <button>Upload<CloudUploadIcon/></button>
            </form>
            {loader && <span className="loaders"></span>}
        </div>
    )
}

export default UpdatePhoto