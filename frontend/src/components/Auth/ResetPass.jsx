import React from "react";
import {useForm} from 'react-hook-form'
import Message,{Error} from "../Message";
import Logo from "../Logo/Logo";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const ResetPass =()=>{
    const{handleSubmit,register} =useForm()
    const {resettoken} = useParams()
    const navigate = useNavigate()
    const resetpassword=(data)=>{
        axios.patch(`/api/user/resetpassword/${resettoken}`,data).then((res)=>{
            navigate('/')
        }).catch((err)=>{
            alert(err.response.data.message)
        })
    }
    return(
        <div className="AuthForm">
            <div className="main">
                <Logo/>
                <form className="inputs" onSubmit={handleSubmit(resetpassword)}>
                    <input type="password" placeholder="Enter newpassword" required {...register("newpassword")}></input>
                    <input type="password" placeholder="conform newpassword" required {...register("conformnewpassword")}></input>
                    <button type="submit">Change password</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPass