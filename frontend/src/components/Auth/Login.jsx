import React, { useState } from "react";
import './Auth.scss'
import L  from '../../assets/images/Logo.png'
import google from '../../assets/images/google.png'
import Logo from "../Logo/Logo";
import {useForm} from 'react-hook-form'
import axios from "axios";
import Message from "../Message";
import { Error } from "../Message";
import { useDispatch } from "react-redux";
import { login } from "../../Store/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
const Login = ()=>{
    const {handleSubmit,register} = useForm()
    const [message,setmessage] = useState('')
    const [showpopm,setshowpopm]=useState(false)
    const [showError,setshowError]= useState(false)
    const navigate  = useNavigate()
    const dispatch = useDispatch()
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
        try{
            api.post('/api/user/login',data).then(res=>{
                dispatch(login(res.data.user))
                showMessagepop('LoggedIn successfully🎉')
                navigate('/')
            }).catch(err=>{
                console.log(err)
                seterror(err.response.data.message)
                ShowErrorPop()
            })
        }catch(err){
            throw new Error(err)
        }
    }
    const googleAuth =()=>{
        window.open('http://localhost:3000/auth/google/callback','_self')
    }
       

    return(
        <div className="AuthForm">
            <div className="main">
                <Logo/>
                <form className="inputs" onSubmit={handleSubmit(Login)}>
                    <input type="text" placeholder="Enter Email" {...register("email")} required></input>
                    <input type="password" placeholder="Enter Password" {...register("password")} required/>
                    <button type="submit">Login</button>
                    <p>new User? <Link to='/signup'>SingUp</Link></p>
                    <Link to="/forgot">Forgot Password?</Link>
                </form>
                <div id="or">
                    <a>or</a>
                </div>
                <div className="google">
                    <button onClick={googleAuth}><img src={google}></img>login with google</button>
                </div>
            </div>
           {showpopm && <Message message={message}/>}
           {showError && <Error message={error}/>}
        </div>
    )
}
export default Login