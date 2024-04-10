import React, { useEffect, useState } from "react";
import {NavLink, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import './Hotel.scss'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import StarIcon from '@mui/icons-material/Star';
import parser from 'html-react-parser'
import ElevatorIcon from '@mui/icons-material/Elevator';
import { AirVent,Wifi,BedIcon,Tv,Users, User} from 'lucide-react';
import ReactMapGL,{Marker,NavigationControl} from 'react-map-gl'
import {useForm} from 'react-hook-form'
import StarRatings from 'react-star-ratings'
import Logo from '../Logo/Logo'
const SingleHotel =()=>{
    let token = "pk.eyJ1Ijoic2FoaWxtYWxpeWEtNTYiLCJhIjoiY2x0Mzh5aGJ3MXVreDJycGxiOXIwamI0NCJ9.CPd5AYtiwyV3K2X_3cRY9Q";
    const [width,setwidth]=  useState(0);
    const {register,handleSubmit} = useForm()
    const [rating,setrating] = useState();
    const {id} = useParams()
    let viewport={
        zoom:1,
        height:'100%',
        width:'100%',
        longitude:0,
        latitude:0
    }
    const [hotel,sethotel] = useState(null)
    if(hotel){
        viewport = {
            zoom:8,
            height:'100%',
            width:'100%',
            longitude:hotel.location.coordinates[1],
            latitude:hotel.location.coordinates[0]
        }
    }
    const [photos,setphotos] = useState([])
    const [currentImg,setCurrentImg] = useState(0)
    const getHotel =async()=>{
        try{
            let res = await axios.get(`/api/Hotel/${id}`,{withCredentials:true})
            if(res.data){
                sethotel(res.data.hotel)
                setphotos(res.data.hotel.photos)
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getHotel()
    },[]);
    if(hotel){
        document.title = hotel.name
    }
    const handleNext=()=>{
        let div = document.getElementsByClassName('photos')[0]
        div.scrollLeft +=500
    }
    const handleprev=()=>{
        let div = document.getElementsByClassName('photos')[0]
        div.scrollLeft -=500
    }
    const writeReview =async(data)=>{
        try{
            data.rating = rating;
            let res = await axios.post(`/api/Review/${hotel._id}`,data,{withCredentials:true});
            if(res.data){
                getHotel();
            }
        }catch(err){
            console.log(err)
        }
    }
    const activeAllReview = ()=>{
        setwidth(400)
        window.scrollTo(0,0)
    }
    return(
        <div className="">
            <header>
                <NavLink to='/'>
                    <Logo/>
                </NavLink>
            </header>
                    <div className="flex justify-center bg-gray-300 p-2">
                        {
                            photos.length>0 ? (<div className=" photos  w-full  h-[500ox] overflow-scroll flex gap-3" id="hp">
                                   {
                                    photos.map((ele)=>(
                                        <img src={ele.photo} className="w-[700px] h-[400px]"></img>
                                    ))
                                   }
                                   <button onClick={handleprev} className="absolute z-10 left-3 top-[200px] bg-white flex justify-center items-center p-2 rounded-full"><ArrowBackIosIcon sx={{fontSize:35}}/></button>
                                   <button onClick={handleNext} className="absolute z-10 right-3 top-[200px] bg-white flex justify-center items-center p-2 rounded-full"><ArrowForwardIosIcon sx={{fontSize:35}}/></button>
                              </div> ):(<div>
                                <img src="https://imgs.search.brave.com/S3T3B8nahnuwGHbVWX6JrrDTeQ9cKkw7nxC8Vabl9lU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg5LzU1LzE1/LzM2MF9GXzg5NTUx/NTk2X0xkSEFaUnd6/M2k0RU00SjBOSE5I/eTJoRVVZRGZYYzBq/LmpwZw" alt="no photo"></img>
                            </div>)
                        }
                       
                    </div>
            <div className="p-4">
                <div className="flex justify-between w-1/2">
                    <div className="">
                        <p className="text-5xl font-bold text-blue-900">{hotel?.name || ' ' }</p>
                        <p className="text-white mt-2">{hotel?.location.address ||  ' '}</p>
                        <span className="flex items-center text-white gap-1" title="capacity"><Users/>{hotel?.capacity ||0}</span>
                    </div>
                    <div className="flex justify-center items-center flex-col">
                        <p className="p-1 w-[80px] bg-green-600  text-white font-bold flex justify-center items-center gap-2 text-xl">
                            {hotel?.ReviewAverage || 0}<span><StarIcon/></span>
                        </p>
                        <p className="p-1 w-[80px] bg-white  font-bold flex justify-center items-center gap-1">
                        {hotel?.ReviewQuantity || 0}
                            <span className="text-sm font-thin"> Ratings</span>
                        </p>
                    </div>
                    
                </div>
               
                <div>
                <div>
                    <h1 className="text-red-500 text-2xl mt-2 ">Discription</h1>
                    <p className="w-1/2 text-white text-justify">
                        {
                          parser(hotel?.discription || ' ' )  
                        }
                    </p>
                    
                </div>
                <div className="w-1/2">
                    <p className="text-red-500 text-2xl mt-2">Amenities</p>
                    <div className="ame flex flex-wrap">
                        <span className="text-white flex w-1/3 mt-2"><AirVent/>AC</span>
                        <span className="text-white flex w-1/3 mt-2"><Wifi/>Wifi</span>
                        <span className="text-white flex w-1/3 mt-2"><BedIcon/>King's Size Bed</span>
                        <span className="text-white flex w-1/3 mt-2"><Tv/>Tv</span>
                        <span className="text-white flex w-1/3 mt-2"><ElevatorIcon/>Elevator</span>
                    </div>
                    <p className="text-red-500 text-2xl mt-2">Owner</p>
                    <div className="flex p-2 bg-white items-center gap-2">
                        <img src={hotel?.owner.photo} alt={hotel?.owner.name} className="w-[50px] h-[50px] rounded-full"></img>
                        <a className="text-xl font-bold" href={hotel?.owner.email}>{hotel?.owner.email}</a>
                    </div>
                </div>
                {/* review writing starts from here */}
                <form className="w-1/2 my-3" onSubmit={handleSubmit(writeReview)}>
                        <label  htmlFor="description"className="text-white font-bold text-md">Feedback:</label>
                        <br></br>
                        <StarRatings rating={rating} changeRating={(e)=>setrating(e)} starRatedColor="blue" name="rating" numberOfStars={5}></StarRatings>
                        
                        <textarea className="bg-gray-200 w-full h-[200px] p-3 font-bold " name="decription" placeholder="write something" {...register("description")}></textarea>
                        <button className="cancel px-2 py-1.5">save</button>
                </form>

                {/*a rewview start showing from here */}
                <div className="reviews">
                    <a className="text-2xl text-red-700 font-bold">Rating and Reviews</a>
                    {
                        hotel?.review.length>0? (<div className="bg-white w-1/2 p-2">
                        <div className="flex justify-between">
                        <div className="flex gap-2 font-bold items-center">
                            <img className="w-[30px] h-[30px] rounded-full" src={hotel?.review[0].author.photo || ''} />
                            <a>{hotel?.review[0].author.name || ' '}</a>
                            <a className="text-sm text-gray-500 ">{hotel?.review[0].createdAt.toLocaleString().split('T')[0] || 0}</a>
                        </div>
                        <a className="bg-green-700 flex items-center text-white p-1"><StarIcon></StarIcon>{hotel?.review[0].rating }</a>
                        </div>

                           
                            <p>{hotel?.review[0].description || ' '}</p>
                            <p></p>
                            <button className="text-red-600 font-bold" onClick={activeAllReview}>See All Reviews</button>
                            </div>):(<a>no reviews</a>)
                    }
                </div>
                <div className="w-1/2 h-[350px] mt-5">
                <ReactMapGL mapStyle="mapbox://styles/mapbox/streets-v11"  mapboxAccessToken={token}  {...viewport}>
                    <Marker latitude={viewport.latitude} longitude={viewport.longitude}>
                    </Marker>
                    <NavigationControl position="bottom-right"/>
                 </ReactMapGL>
                </div>
                </div>
            </div>
            {/* all reviews block */}
            <div className="allrev absolute  right-0 z-10 top-0 min-h-full bg-white" style={{width:`${width}px`}} id="hidden">
                <h1 className="text-red-500 p-2 font-bold">All Reviews of {hotel?.name || ' '}</h1>
            {
                        hotel?.review.length>0? (<div className="flex flex-col gap-1 ">
                            {
                                hotel.review.map((ele)=>(
                                    <div className="bg-white  p-2">
                                     <div className="flex justify-between">
                                      <div className="flex gap-2 font-bold items-center">
                                        <img className="w-[30px] h-[30px] rounded-full" src={ele.author.photo || ''} />
                                        <a>{ele.author.name || ' '}</a>
                                        <a className="text-sm text-gray-500 ">{ele.createdAt.toLocaleString().split('T')[0] || 0}</a>
                                      </div>
                                     <a className="bg-green-700 flex items-center text-white p-1"><StarIcon></StarIcon>{ele.rating }</a>
                                     </div>
                                     <p>{ele.description || ' '}</p>
                                    </div>
                                ))
                            }
                        </div>):(<a>no reviews</a>)
                    }
                   {width && <button className="absolute text-white top-[0px] right-[400px] z-10 bg-red-700 p-3" onClick={()=>setwidth(0)}>Close</button>}
            </div>
        </div>
    )
}

export default SingleHotel