import React, { useState } from "react";
import './Auth.scss'
import axios from "axios";
import {useForm} from 'react-hook-form'
import Logo from "../Logo/Logo";
import Message from "../Message";
const ForgotPass = ()=>{
    const {handleSubmit, register}= useForm()
    const [showmessage,setshowmessage] = useState(false)
    const [message,setmessage]= useState('')
    const [showerror,setshowerror] = useState(false)
    const [error,seterror]=useState('')
    const messagepop =(msg)=>{
        setmessage(msg)
        setshowmessage(true)
        setTimeout(()=>{
            setmessage('');
            setshowmessage(false)
        },2000)
    }
    const errorpop =(err)=>{
        setshowerror(true)
        seterror(err)
        setTimeout(()=>{
            seterror('')
            setshowerror(false)
        },2000)
    }
    const forgotpassword = (data)=>{
        axios.patch('/api/user/forgotpassword',data,{withCredentials:true}).then(res=>{
            messagepop(res.data.message)
        }).catch((err)=>{
            errorpop(err.response.data.message)
        })
    }
    return(
        <div className="AuthForm">
            <div className="main">
                <Logo/>
            <form className="inputs" onSubmit={handleSubmit(forgotpassword)}>
                <input type="email" placeholder="enter email" required {...register("email")}></input>
                <button type="submit">Get ResetLink</button>
            </form>

        </div>
        {showmessage && <Message message={message}/>}
        {error && <Error message={error}/>}
        </div>
    )
}

export default ForgotPass