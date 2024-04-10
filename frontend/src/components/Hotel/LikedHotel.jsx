import React, { useEffect, useState } from "react";
import Hotels from "./Hotels";
import axios from "axios";

const LikedHotel =()=>{
    const [hotels,setHotels] = useState([])
    useEffect(()=>{
        axios.get('/api/Hotel/likedHotel',{withCredentials:true}).then((res)=>{
            setHotels(res.data.likes)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    return(
        <Hotels hotels={hotels} />
    )
}

export default LikedHotel;