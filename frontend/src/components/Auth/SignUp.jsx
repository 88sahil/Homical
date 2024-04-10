import React, { useState } from "react";
import Logo from "../Logo/Logo";
import google from '../../assets/images/google.png'
import {useForm} from 'react-hook-form'
import './Auth.scss'
import axios from "axios";
import Message from "../Message";
import { Error } from "../Message";
import { useDispatch } from "react-redux";
import { login } from "../../Store/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
const SignUp = ()=>{
    const {handleSubmit,register}= useForm()
    const [showpopm,setshowpopm] = useState(false)
    const [showError,setshowError] = useState(false)
    const [message,setmessage] = useState('')
    const [error,seterror]= useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const showpop = (msg)=>{
        setmessage(msg)
        setshowpopm(true)
        setTimeout(()=>{
            setmessage('')
            setshowpopm(false);
        },2000)
    }
    const showerr = (err)=>{
        seterror(err);
        setshowError(true);
        setTimeout(()=>{
            seterror('');
            setshowError(false);
        },2000)
    }
    const RegisterUser =(data)=>{
           try{
            axios.post('/api/user/signup',data,{withCredentials:true}).then((res)=>{
                dispatch(login(res.data.user))
                showpop('user created successfully🎉') 
                navigate('/')
            }).catch(err=>{
                showerr(err.response.data.message)
            })
           }catch(err){
            showerr(err.response.data.message)
           }
    }
    return(
        <div className="AuthForm">
        <div className="main">
            <Logo/>
            <form className="inputs" onSubmit={handleSubmit(RegisterUser)}>
                <input type="text" placeholder="Enter Email" {...register("email")} required></input>
                <input type="text" placeholder="Enter Name" {...register("name")} required></input>
                <input type="text" placeholder="Enter username" {...register("username")} required></input>
                <input type="password" placeholder="Enter Password" {...register("password")} required/>
                <input type="password" placeholder="conform Password" {...register("conformpassword")} required/>
                <button type="submit">Register</button>
                <p>Already have a account? <Link to='/login'>login</Link></p>
            </form>
            <div id="or">
                <a>or</a>
            </div>
            <div className="google">
                <button><img src={google}></img>Register with google</button>
            </div>
        </div>
       {showpopm && <Message message={message}/>}
       {showError && <Error message={error}/>}
    </div>
    )
}
export default SignUp