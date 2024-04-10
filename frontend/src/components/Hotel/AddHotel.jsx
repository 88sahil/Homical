import React, { useState } from "react";
import Logo from '../../assets/images/Logo.png'
import {NavLink} from 'react-router-dom'
import HotelIcon from '@mui/icons-material/Hotel';
import Message from '../Message'
import './Hotel.scss'
import {useForm} from 'react-hook-form'
import RTE from "./RTE";
import axios from 'axios'
const AddHotel =()=>{
    const [loader,setloader] = useState(false)
    const {handleSubmit,register,control,getValues} = useForm()
    const [image,setimage] = useState(null)
    const [message,setmessage] = useState(null)

    const showmessage =(msg)=>{
        setmessage(msg)
        setTimeout(()=>{
            setmessage(null)
        },2000)
    }
    const hotels = ['Villa Rooms',
    'Suites',
    'Restaurant',
    'Meeting Rooms',
    'Spa']

    // add hotel
    const addImage = async(img)=>{
      
        const headers = {
            'Content-Type': 'multipart/form-data'
          };
        let response=await axios.post('/api/Hotel/uploadPhoto',{"profile":img},{headers, withCredentials:true})
        return response
    }
    const AddHotel =async (data)=>{
        setloader(true)
        let profile;
        if(image){
           profile = await addImage(image)
        }
        if(profile.data){
            data.coverphoto = profile.data.url,
            data.coverPhotoId = profile.data.id
        }

        axios.post('/api/Hotel/',data,{withCredentials:true}).then((res)=>{
            setloader(false);
            showmessage('hotel created successfully🎉')
        }).catch((err)=>{
            console.log(err.response.data.message)
        })
    }
    return(     
        <div className="HostMain">
            <header>
                <NavLink className="LogoDiv" to='/'>
                    <img src={Logo} alt="Logo"/>
                    <a>Homical</a>
                </NavLink>
            </header>
            <div className="HostForm">
                <h2>Register Hotel <HotelIcon sx={{fontSize:35,color:"white"}}/></h2>
                <form className="form" onSubmit={handleSubmit(AddHotel)}>
                   <div className="form_div_1">
                   <input type="text" placeholder="HotelName" {...register("name")}required></input>
                    <div className="rte">
                         <RTE name="discription" control={control} defaultValue={getValues("discription")}/>
                    </div>
                    <input type="Number" placeholder="Capacity" {...register("capacity")} required></input>
                    <input type="Number" placeholder="Price" {...register("price")} required/>
                    
                   </div>
                   <div className="form_div_2">
                    {image &&  <img src={URL.createObjectURL(image)} alt="no photo" id="Photo"/>}
                   <input type="file" accept="image/*" onChange={(e)=>setimage(e.target.files[0])}/>
                    <select {...register("category")} required>
                       {
                        hotels.map((ele,index)=>(
                            <option value={ele} key={index}>{ele}</option>
                        ))
                       }
                    </select>
                    <button>Register</button>
                   </div>
                </form>
            </div>
        {message && <Message message={message}/> }
           {loader&& <div class="loader"></div>}
        </div>
    )
}

export default AddHotel