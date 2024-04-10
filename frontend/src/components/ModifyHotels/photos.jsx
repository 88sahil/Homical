import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {useForm} from 'react-hook-form'
import axios from "axios";
import './MyHotel.scss'
import { addHotel } from "../../Store/HotelSlice";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const Photos =()=>{
    const {id} = useParams();
    let hotel = useSelector(state=>state.myhotel.myHotel)
    const [loader,setloader] = useState(false)
    const [photos,setphotos] = useState([]);
    const {handleSubmit,register} =useForm();
    const dispatch = useDispatch();
    useEffect(()=>{
        setphotos(hotel.photos);
    },[hotel])
    const handleUpload =async(data)=>{
        setloader(true)
       const formData = new FormData()
       for(let ele of data.photos){
             formData.append('photos',ele)
       }
        try{
            let res = await axios.patch(`/api/Hotel/UploadPhoto/${id}`,formData,{withCredentials:true,headers:{
                'Content-Type':'multipart/form-data'
            }})
            if(res.data){
                setloader(false)
                dispatch(addHotel(res.data.hotel))
            }
        }catch(err){
            console.log(err)
        }
    }
    const deleteimg =async(data,event)=>{
        setloader(true)
        const hid = {
            id:data
        }
        try{
            let res = await axios.patch(`/api/Hotel/deletephoto/${id}`,hid,{withCredentials:true})
            if(res.data){
                dispatch(addHotel(res.data.hotel))
                setloader(false)
            }
        }catch(err){
            setloader(false)
            console.log(err)
        }
    }
    return(
        <div>
            <div>
               {
                photos.length>0? (<div className="flex flex-wrap gap-5 px-5 py-2">
                   { photos?.map((img,index)=>(
                    <div key={index} className="relative w-[450px] h-[300px] p-1 bg-gray-300 rounded-[20px]">
                         <img src={img.photo} alt="no photo" className="w-full h-full object-cover rounded-[12px]"></img>
                         <button className="absolute z-20 right-[15px] top-[15px]" onClick={()=>deleteimg(img.id)}><DeleteForeverIcon sx={{color:'red',fontSize:35}}/></button>
                    </div>
                   ))}
                </div>):(<div> no photos available😟 upload now</div>)
               }
            </div>
            <form onSubmit={handleSubmit(handleUpload)} className="flex justify-center mt-5">
                <input type="file" accept="image/*" className="text-white font-bold" {...register("photos")} multiple required></input>
                <button type="submit" className="cancel px-2 py-1.5 text-white font-bold rounded-sm">Upload</button>
            </form>
            {loader && <span className="loaders"></span>}
        </div>
    )
}

export default Photos;