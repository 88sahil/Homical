import React, { useEffect, useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import './Hotel.scss'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { addlikes, dislikes } from "../../Store/LikeSlice";
import { NavLink } from "react-router-dom";
const HotelCard =({Hotel,linkto})=>{
    const user =  useSelector(state=>state.auth.UserData)
    const [Like,setLike] = useState(false)
    const [LikeCount,setLikecount] = useState(Hotel.likecount? Hotel.likecount:0);
    
    const [likess,setlike] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        if(user){
            setlike(user.likes)
        }
            const isLiked = likess.includes(Hotel._id);
            setLike(isLiked);
            
    },[likess]);

    const addLIke =()=>{
        setLike(true)
        setLikecount(prev=>prev+1)
        axios.patch(`/api/Hotel/addLike/${Hotel._id}`).then((res)=>{
            dispatch(addlikes())
        }).catch((err)=>{
            console.log(err)
            setLike(false)
            setLikecount(prev=>prev-1);
        })
    }
    const dislike = ()=>{
        setLike(false)
        setLikecount(prev=>prev-1)
        axios.patch(`/api/Hotel/disLike/${Hotel._id}`).then((res)=>{
            dispatch(dislikes())
        }).catch((err)=>{
            setLike(true)
            setLikecount(prev=>prev+1);
        })
    }
    return(
        <NavLink className="HotelCard" to={linkto}>
           <img src={Hotel.coverphoto} alt="no photo" />
           <div className="py-2">
            <a className="text-2xl font-bold text-gray-200">{Hotel.name}</a>
            <br></br>
            <div className=" flex justify-between">
            <p id="address" className="w-[200px] text-sm text-white overflow-hidden">{Hotel.location.address}</p>
            <a>{Hotel.price}&#x20b9; per Room</a>
            </div>
           </div>
           <div className="rating">
                <StarIcon sx={{color:"white",fontSize:18}}/>
                <a>{Hotel.ReviewAverage || 0}</a>
           </div>
           <div className="like" id="like" onClick={Like? dislike:addLIke}>
                {
                    Like? (<FavoriteIcon sx={{color:"rgb(255, 15, 67)",fontSize:18}}/>):(<FavoriteBorderIcon  sx={{color:'white',fontSize:18}}/>)
                }
                <a>{LikeCount}</a>
           </div>
        </NavLink>
    )
}

export default HotelCard
