import React, { useEffect, useState } from "react";
import Hotels from "../components/Hotel/Hotels";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AllHotels } from "../Store/HotelSlice";

const HotelPage =()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        const getHotel =async()=>{
            const hotel = await axios.get('/api/Hotel',{withCredentials:true})
            if(hotel.data){
                dispatch(AllHotels(hotel.data.hotels))
            }
        }
        getHotel()
    },[])
    let hotel = useSelector(state=>state.myhotel.AllHotel)
    return(
        <Hotels hotels={hotel}/>
    )
}

export default HotelPage;