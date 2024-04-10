import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './MyHotel.scss'
import {useForm} from 'react-hook-form'
import axios from "axios";
import { addHotel } from "../../Store/HotelSlice";
const UpdateCover=()=>{
    const {id} = useParams()
    const [loader,setloader] = useState(false)
    let hotel = useSelector(state=>state.myhotel.myHotel)
    const dispatch = useDispatch();

    const {handleSubmit,register} = useForm()
    let photo =" "
    let name =" "
    if(hotel){
        photo = hotel.coverphoto
        name = hotel.name
    }
    const uploadImage =async(data)=>{
        setloader(true)
        try{
            let res = await axios.patch(`/api/Hotel/uploadCover/${id}`,{profile:data.profile[0]},{withCredentials:true,headers:{
                'Content-Type':'multipart/form-data'
            }})
            if(res.data){
                dispatch(addHotel(res.data.hotel))
                setloader(false)
            }
        }catch(err){
            setloader(false)
            console.log(err)
        }
    }
    return (
        <div className="flex p-10 justify-center">
            <div className="w-[500px] h-[350px] bg-gray-200 flex  p-2 rounded-[20px]">
                <img src={photo} title={name} alt="photo" className="rounded-[12px] object-fill w-full h-full"></img>
            </div>
            <form className="flex items-center pl-8" onSubmit={handleSubmit(uploadImage)}>
                <input type="file" accept="image/*" {...register('profile')} required></input>
                <button className="bg-gray-500 px-3 py-1 font-bold rounded-sm" style={{backgroundColor:'#8EC5FC',backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)'}} >Upload</button>
            </form>
           {loader && <span className="loaders"></span>}
        </div>
    )
}
export default UpdateCover
