import React, { useCallback, useState } from "react";
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux";
import './Users.scss';
import axios from "axios";
import Message,{Error} from '../Message'
import {login} from '../../Store/AuthSlice'
const UserDetails = ()=>{
    const dispatch = useDispatch()
    const [editable,seteditable] = useState(false)
    const [msg,setmsg] = useState('')
    const [showerr,setshowerr] = useState(false);
    const [showmsg,setshowmsg] = useState(false);
    const [user,setuser] = useState(useSelector(state=>state.auth.UserData))
    let photo="";  
    if(user){
        photo = user.photo;
    }
    const msgpop =(message)=>{
        setshowmsg(true)
        setmsg('userUpdateSuccessFully')
        setTimeout(()=>{
            setshowmsg(false);
            setmsg('')
        },2000)
    }
    const errpop =(message)=>{
        setshowerr(true)
        setmsg(message)
        setTimeout(()=>{
            setshowerr(false);
            setmsg('')
        },2000)
    }
    const updt =async(data,e)=>{
        e.preventDefault();
        try{
            let user = await axios.patch('/api/user/updateMe',data,{withCredentials:true});
        if(user.data){
            msgpop();
            dispatch(login(user.data.user));
            seteditable(false)
        }
        }catch(err){
            errpop(err.response.data.message)
        }
    }
    const updateclk =(e)=>{
        e.preventDefault();
        seteditable(prev=>!prev)
        console.log(editable)
    }
    const {register,handleSubmit} = useForm(
        {
            defaultValues:{
                username: user? user.username:' ',
                email:user? user.email:' ',
                name:user? user.name:' ',
                role:user? user.role:''
            }
        }
    )
        return(
        <div className="UDMain">
            <form onSubmit={handleSubmit(updt)}>
                <img src={photo}></img>
                <input type="text" {...register("username")} disabled={!editable}></input>
                <input type="text" {...register("email")} disabled={!editable}></input>
                <input type="text" {...register("name")} disabled={!editable}></input>
                <select {...register("role")} disabled={!editable}>
                    <option value="user">user</option>
                    <option value='owner'>owner</option>
                </select>
                {
                    editable? (<button type="submit">Save</button>):(<button onClick={(e)=>updateclk(e)}>Update</button>)
                }
            </form>
            {showmsg && <Message message={msg}/>}
            {showerr && <Error message={msg}/>}
        </div>
    )
}
export default UserDetails