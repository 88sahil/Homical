import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {login,logout as Logout} from '../../Store/AuthSlice'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import './Home.scss'
import logo from '../../assets/images/Logo.png'
import WidgetsIcon from '@mui/icons-material/Widgets';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { useNavigate,NavLink, Link, Outlet } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { initLike } from "../../Store/LikeSlice";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import UserOve from "./UserOve";
import { AllHotels } from "../../Store/HotelSlice";
const Homepage =()=>{
    const dispatch = useDispatch()
    const [Uo,setUo] = useState(false)
    const navigate = useNavigate()
    const user =  useSelector(state=>state.auth.UserData)
    const active = useSelector(state=>state.auth.status)
    let likes = useSelector(state=>state.likes.likeCount)
    const signout= async()=>{
        const lo = await axios.get('/api/user/logout',{withCredentials:true})
        console.log(lo)
        if(lo.data){
            navigate('/login')
            dispatch(Logout())
        }else{
            alert("error")
        }
    }
    useEffect(()=>{
        const getuser =async()=>{
            const user = await axios.get('/api/user/verify',{withCredentials:true})
            if(user.data){
                dispatch(login(user.data.user))
               dispatch(initLike(user.data.user.likes.length))
            }
        }
        getuser()
     },[])
     const hotelscate = ['Villa Rooms',
    'Suites',
    'Restaurant',
    'Meeting Rooms',
    'Spa']
    const getByCate = async(data)=>{
        try{
            let res=await axios.get(`/api/Hotel?category=${data}`,{withCredentials:true})
            if(res.data){
                dispatch(AllHotels(res.data.hotels))
            }
        }catch(err){
            console.log(err)
        }
    }
    const getAll =async()=>{
        try{
            let res=await axios.get(`/api/Hotel`,{withCredentials:true})
            if(res.data){
                dispatch(AllHotels(res.data.hotels))
            }
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div className="Home">
            <header className="header">
                <div className="logodiv">
                    <img src={logo}></img>
                    <a>Homical</a>
                </div>
                <div className="middlediv">
                    <ul>
                        <li><a>Categories</a></li>
                        {active && <li><NavLink to='/BecomeHost'><a>Become a Host</a></NavLink></li>}
                        <li><a>terms</a></li>
                        <li><a>FAQs</a></li>
                    </ul>
                </div>
                <div className="secdiv">
                    <NavLink><WidgetsIcon sx={{color:"white"}}/></NavLink>
                    <NavLink><SettingsIcon sx={{color:"white"}}/></NavLink>
                    <NavLink><NotificationsIcon sx={{color:"white"}}/></NavLink>
                </div>
                <div className="thirdiv">
                {active && <img src={user.photo} onClick={(e)=>setUo(prev=>!prev)}/>}
                {!active && <button className="loginbtn" onClick={()=>navigate('/login')}>Login</button>}
                </div>
            </header>
            <div className="filter">
                <div className="f-div1">
                        <div className="search-div">
                            <form className="form">
                                <SearchOutlinedIcon sx={{color:"white",fontSize:35,fontWeight:"bold"}}/>
                                <input type="text" placeholder="Search in Home,Villas..." required/>
                            </form>
                        </div>
                        <div className="filter-div">
                            <a>Recommended:</a>
                            {/* //TODO - recommanded */}
                            <div>
                            <button className="rec-btn" onClick={getAll}>All</button>
                            {
                                
                            hotelscate.map((ele,index)=>(
                                <button className="rec-btn" key={index} onClick={()=>getByCate(ele)}>{ele}</button>
                            ))
                        }
                            </div>
                        </div>
                        <div className="filter-2">
                            <button><TuneOutlinedIcon sx={{color:"blue"}}></TuneOutlinedIcon>filter</button>
                         </div>
                </div>
                
            </div>
                 <div className="Hotels-Hero">
                    <div className="Hero_nav">
                        <div className="allHeros">
                            <NavLink className='allnavs'>
                                <HomeIcon sx={{fontSize:30}}/>
                            </NavLink>
                            <NavLink className='allnavs'>
                                <AccountBalanceWalletIcon  sx={{fontSize:30}}/>
                            </NavLink>
                            <NavLink className='allnavs' id="likes" to='/likes'>
                                <FavoriteBorderIcon  sx={{fontSize:30}}/>
                                <a id="likec">+{likes}</a>
                            </NavLink>
                            <NavLink className='allnavs'>
                                <MailOutlineIcon  sx={{fontSize:30}}/>
                            </NavLink>
                            <div className="border-botm">

                            </div>
                            <div className="logout">
                                <ExitToAppIcon sx={{fontSize:35}} onClick={signout}/>
                            </div>
                        </div>
                    </div>
                    <div className="Hero2">
                        <Outlet/>
                    </div>
                   {Uo &&
                     <div className="UO">
                     <UserOve/>
                    </div>
                   }
                 </div>
        </div>
    )
}

export default Homepage