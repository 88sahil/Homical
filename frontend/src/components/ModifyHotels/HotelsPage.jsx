import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HotelCard from "../Hotel/HotelCard";
import { NavLink } from "react-router-dom";
import Map from "../Map";
import Logo from '../Logo/Logo'
const HotelsPage = ()=>{
    const [myHotels,setmyHotels] = useState([]);
    let id ="";
    const user = useSelector(state=>state.auth.UserData);
    if(user){
        id = user._id;
    }
    const getHotels = async()=>{
        try{
            let res = await axios.get(`/api/Hotel?owner=${id}`,{withCredentials:true});
            if(res.data){
                setmyHotels(res.data.hotels)
            }
        }catch(err){
            console.log(err.response.data)
        }
    }
    useEffect(()=>{
            getHotels();
    },[])
    return(
        <div style={{width:'100%',minHeight:'100vh'}} className="p-[25px]">
            <header>
                <NavLink to='/'>
                    <Logo/>
                </NavLink>
            </header>
            <h1 className="h1 text-white text-[25px] border-r border-black">Update Your Hotels</h1>
            {
                myHotels.length>0 && <div className="flex gap-4 mt-8" >
                    {
                        myHotels.map((ele,index)=>(
                                <HotelCard Hotel={ele} linkto={`/MyHotel/${ele._id}/hotelData`}/>
                        ))
                    }
                </div>
            }
        </div>
    )
}
export default HotelsPage;