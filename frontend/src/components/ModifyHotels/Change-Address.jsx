import React, { useEffect, useState } from "react";
import Map from "../Map";
import '../../../node_modules/mapbox-gl/dist/mapbox-gl.css'
import { useDispatch, useSelector } from "react-redux";
import {useForm} from 'react-hook-form'
import axios from "axios";
import { useParams } from "react-router-dom";
import { addHotel } from "../../Store/HotelSlice";
import './MyHotel.scss'
const ChangeAddress =()=>{
    const {id} = useParams()
    const [location,setlocation] = useState(null)
    const [loader,setloader] = useState(false)
    const dispatch = useDispatch()
    const {handleSubmit,register,reset} = useForm({defaultValues:{
        coordinates:location?.coordinates ||'',
        address:location?.address || ' ',
        City:location?.City || ' ',

    }})
    useEffect(()=>{
        reset({
            coordinates:location?.coordinates ||'',
            address:location?.address || ' ',
            City:location?.City || ' ',
        })
    },[location])
    const hotel = useSelector(state=>state.myhotel.myHotel)
    const [coordinates,setcoordinates] = useState(hotel.location.coordinates)
    console.log(coordinates)
    useEffect(()=>{
        setcoordinates(hotel.location.coordinates)
    },[hotel])
    const handelSave =async(data)=>{
        setloader(true)
        try{
            let res = await axios.patch(`/api/Hotel/updateHotel/${id}`,{location:data},{withCredentials:true})
            if(res.data){
                dispatch(addHotel(res.data.hotel))
                setloader(false)
            }
        }catch(err){
            console.log(err)
            setloader(false)
        }
    }
    return(
        <div className="p-4">
            <form onSubmit={handleSubmit(handelSave)}>
                <div className="flex flex-col gap-1">
                <label className="text-white font-bold" >City</label>
                <input type="text" className="w-[300px] px-2 py-1.5" {...register("City")}></input> 
                </div>
                <br></br>
                <div className="flex flex-col gap-1">
                    <label  className="text-white font-bold" >Address</label>
                    <input type="text" className="w-[300px] px-2  py-1.5" {...register("address")}></input>
                </div>
                <button className="cancel px-2 py-1.5 rounded-sm my-1">Save</button>
            </form>
            <Map location={setlocation} coordinates={coordinates}/>
           {loader && <span className="loaders"></span>}
        </div>
    )
}

export default ChangeAddress