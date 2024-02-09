import React, { useState } from "react";
import './Auth.scss'
import L  from '../../assets/images/Logo.png'
import google from '../../assets/images/google.png'
import Logo from "../Logo/Logo";
import {useForm} from 'react-hook-form'
import axios from "axios";
import Message from "../Message";
import { Error } from "../Message";
const Login = ()=>{
    const {handleSubmit,register} = useForm()
    const [message,setmessage] = useState('')
    const [showpopm,setshowpopm]=useState(false)
    const [showError,setshowError]= useState(false)
    const showMessagepop = (msg)=>{
        setshowpopm(true)
        setmessage(msg)
        setTimeout(()=>{
            setmessage('')
            setshowpopm(false)
        },2000)
    }
    const ShowErrorPop =()=>{
        setshowError(true)
        setTimeout(()=>{
            setshowError(false)
        },2000)
    }
    const api = axios.create({
        withCredentials:true
    })
    const [error,seterror] = useState('')
    const Login =(data)=>{
        api.post('/api/user/login',data).then(res=>{
            console.log(res.data)
            showMessagepop('LoggedIn successfully🎉')
        }).catch(err=>{
            seterror(err.response.data.message)
            ShowErrorPop()
        })
    }
    return(
        <div className="AuthForm">
            <div className="main">
                <Logo/>
                <form className="inputs" onSubmit={handleSubmit(Login)}>
                    <input type="text" placeholder="Enter Email" {...register("email")} required></input>
                    <input type="password" placeholder="Enter Password" {...register("password")} required/>
                    <button type="submit">Login</button>
                </form>
                <div id="or">
                    <a>or</a>
                </div>
                <div className="google">
                    <button><img src={google}></img>login with google</button>
                </div>
            </div>
           {showpopm && <Message message={message}/>}
           {showError && <Error message={error}/>}
        </div>
    )
}
export default Login