import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addHotel } from "../../Store/HotelSlice";
import { useParams } from "react-router-dom";
import RTE from "../Hotel/RTE";
import axios from "axios";
import './MyHotel.scss'
import Diversity1Icon from '@mui/icons-material/Diversity1';

//name
import BadgeIcon from '@mui/icons-material/Badge';
//capacity
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DiscountIcon from '@mui/icons-material/Discount';
import StarHalfIcon from '@mui/icons-material/StarHalf';
const HotelDetails=()=>{
    const [loader,setloader] = useState(false)
    const [editable,seteditable] = useState(false);
    const [isUpdate,setisUpdate] = useState(false);
    const dispatch = useDispatch()
    const {id} = useParams()
    let hotel = useSelector(state=>state.myhotel.myHotel)
    useEffect(()=>{
       getHotel();
    },[])
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
     const {handleSubmit,register,control,getValues,reset} = useForm({defaultValues:{
        name : hotel?.name || ' ',
        discription:hotel?.discription ||' ',
        capacity:hotel?.capacity || ' ',
        price:hotel?.price || ' ',
        discount:hotel?.discount || ' ',
        likecount:hotel?.likecount || ' ',
        ReviewQuantity:hotel?.ReviewQuantity || ' ',
        ReviewAverage:hotel?.ReviewAverage || ' ',
        category:hotel?.category || ' ',
     }})
    
     useEffect(()=>{
        reset({
        name : hotel?.name || ' ',
        discription:hotel?.discription ||' ',
        capacity:hotel?.capacity || ' ',
        price:hotel?.price || ' ',
        discount:hotel?.discount || 0,
        likecount:hotel?.likecount || 0,
        ReviewQuantity:hotel?.ReviewQuantity || 0,
        ReviewAverage:hotel?.ReviewAverage || 0,
        category :hotel?.category || ' '
        })
     },[hotel])
     const handleupdateclk =(e)=>{
        e.preventDefault();
        seteditable(true)
        setisUpdate(prev=>!prev)
     }
     const handlesave =async(data,e)=>{
        e.preventDefault();
        setloader(true)
       try{
        let res = await axios.patch(`/api/Hotel/updateHotel/${id}`,data,{withCredentials:true})
        if(res){
            dispatch(addHotel(res.data.hotel))
            setisUpdate(false)
            seteditable(false)
            setloader(false)
        }
       }catch(err){
            console.log(err)
       }
     }
     const hotels = ['Villa Rooms',
     'Suites',
     'Restaurant',
     'Meeting Rooms',
     'Spa']
    return(
        <div className="w-full h-full">
            <form className="w-full min-h-screen p-10" onSubmit={handleSubmit(handlesave)}>
                <div className="field-1">
                <div>
                    <label><BadgeIcon/>Name</label>
                    <input type="text"  {...register("name",{disabled:!editable})}/>
                </div>
                <div>
                    <label><PeopleOutlineIcon/>Capcity</label>
                    <input type="Number" {...register("capacity",{disabled:!editable})}/>
                </div>
                <div>
                    <label><PriceChangeIcon/>Price</label>
                    <input type="Number" contentEditable={editable} {...register("price",{disabled:!editable})}/>
                </div>
                <div>
                    <label><ThumbUpAltIcon/>Likes</label>
                    <input type="Number" contentEditable={editable} {...register("likecount",{disabled:true})}/>
                </div>
                <div>
                    <label><DiscountIcon/>Discount</label>
                    <input type="Number" contentEditable={editable} {...register("discount",{disabled:!editable})}/>
                </div>
                <div>
                    <label><Diversity1Icon/>ReviewCount</label>
                    <input type="Number" contentEditable={editable} {...register("ReviewQuantity",{disabled:true})}/>
                </div>
                <div>
                    <label><StarHalfIcon/>ReviewAverage</label>
                    <input type="Number" contentEditable={false} {...register("ReviewAverage",{disabled:true})}></input>
                </div>
                <div>
                    <label><StarHalfIcon/>category</label>
                    <select {...register("category",{disabled:!editable})}>
                        {
                            hotels.map((ele,index)=>(
                                <option value={ele} key={index}>{ele}</option>
                            ))
                        }
                    </select>
                </div>
                </div>
                <div className="flex flex-col w-10/12 gap-4">
                    <label className="text-white">Discription</label>
                    <RTE name="discription" control={control} defaultValue={getValues("discription")} />
                </div>
                <div className="buttons">
                    {isUpdate ?<button className='save' type="submit">save</button>:<button className="save" onClick={handleupdateclk}>Update</button>}
                    <button className="cancel" onClick={()=>{seteditable(prev=>!prev);seteditable(false)}} disabled={!isUpdate}>cancel</button>
                </div>
            </form>
            {loader && <span className="loaders"></span>}
        </div>
    )
}

export default HotelDetails