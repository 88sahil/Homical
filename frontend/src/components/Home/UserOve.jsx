import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const UserOve =()=>{
    const navigate = useNavigate()
    let user = useSelector(state=>state.auth.UserData);
    let isOwner = false;
    let username ="guest";
    let photo=""
    let name =""
    if(user){
        username = user.username;
        photo = user.photo;
        name = user.name;
        if(user.role != 'user'){
            isOwner = true;
        }
    }
    return(
        <div className="UserOve">
            <img src={photo} alt={username}/>
            <a>{name}</a>

            <button onClick={()=>navigate('/UserEdit/updateuser')}>Manage Account</button>
            {isOwner && <button onClick={()=>navigate('/manageHotel')}>Manage Hotels</button>}
        </div>
    )
}

export default UserOve