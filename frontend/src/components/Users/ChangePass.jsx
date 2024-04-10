import React, { useState } from "react";
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import './Users.scss';
import Message, { Error } from '../Message'
import {login} from '../../Store/AuthSlice'
const ChangePass =()=>{
    const [msg,setmsg] = useState('')
    const dispatch = useDispatch()
    const [showmsg,setshowmsg] = useState(false);
    const [showerr,setshowerr] = useState(false)
    const showmsgpop =(message)=>{
        setmsg(message);
        setshowmsg(true);
        setTimeout(()=>{
            setmsg('');
            setshowmsg(false)
        },2000)
    }
    const showerrpop =(message)=>{
        setmsg(message);
        setshowerr(true);
        setTimeout(()=>{
            setmsg('');
            setshowerr(false)
        },2000)
    }
    const {register,handleSubmit} = useForm()
    const updatepass = async(data)=>{
        try{
            let res = await  axios.patch('/api/user/updatepassword',data,{withCredentials:true})
            if(res.data){
                showmsgpop('password changed successfully');
                dispatch(login(res.data.user))
            }
        }catch(err){
            showerrpop(err.response.data.message)
        }
    }
    return(
        <div className="cp">
            <form onSubmit={handleSubmit(updatepass)}>
                <label>
                    Old Password
                    </label>
                    <input type="password" placeholder="Enter Old PassWord" required {...register("oldpassword")}></input>
               
                <label>
                    New Password
                </label>
                    <input type="password" placeholder="Enter new Password" required {...register("newpassword")}></input>
                
                <label>
                    Conform newPassword
                </label>
                    <input type="password" placeholder="Conform new password" required {...register("conformnewpassword")}></input>
             <div className="btn">
             <button>Update Password</button>
             </div>
            </form>
            {showmsg && <Message message={msg}/>}
            {showerr && <Error message={msg}/>}
        </div>
    )
}

export default ChangePass;