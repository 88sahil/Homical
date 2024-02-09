import React from "react";
import './Logo/Logo.scss'
const Message =(props)=>{
    return(
        <div className="message">
            <p>{props.message}</p>
        </div>
    )
}

export const Error =(props)=>{
    return(
        <div className="error">
            <p>{props.message}</p>
        </div>
    )
}

export default Message