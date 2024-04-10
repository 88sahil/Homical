import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import axios from "axios";
import {addHotel} from '../../Store/HotelSlice'
import { useDispatch } from "react-redux";
import '../Users/Users.scss'
import { NotebookTabs } from 'lucide-react';
import ImageIcon from '@mui/icons-material/Image';
import Logo from '../Logo/Logo'
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
const MyHotel =()=>{
    useEffect(()=>{
        getHotel()
    })
    const {id} = useParams()
    const dispatch = useDispatch();
    const [Hid,setHid] = useState(" ")
    const getHotel = async()=>{
       try{
        let res = await axios.get(`/api/Hotel?_id=${id}`,{withCredentials:true})
        if(res.data){
            dispatch(addHotel(res.data.hotels[0]))
            setHid(res.data.hotels[0]._id)
        }
       }catch(err){
        console.log(err.response.data.message)
       }
    }
    
    return(
        <div className="w-full flex">
            <div className="hotelRightDiv">
                <div>
                    
                </div>
                <NavLink className='urv' to={`/MyHotel/${Hid}/hotelData`}>
                        <NotebookTabs/>
                        <a>Details</a>
                    </NavLink>
                    <NavLink className='urv ' to={`/MyHotel/${Hid}/updateCover`}>
                        <a className="flex items-center"><ImageIcon/>CoverPhoto</a>
                    </NavLink>
                    <NavLink className='urv' to={`/MyHotel/${Hid}/photo`}>
                        <a><PhotoLibraryIcon></PhotoLibraryIcon>Photos</a>
                    </NavLink>
                    <NavLink className='urv' to={`/MyHotel/${Hid}/address`}>
                        <a className="flex justify-center"><LocationCityIcon/>Address</a>
                    </NavLink>
            </div>
            <div className="w-full">
                <Outlet/>
            </div>
        </div>
    )
}

export default MyHotel