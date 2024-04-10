import React from "react";
import HotelCard from "./HotelCard";
import './Hotel.scss'
const Hotels =({hotels})=>{
    return(
        <div className="Hero2">
        { hotels.length>0? (
            hotels.map((ele,index)=>(
                <HotelCard Hotel={ele} key={index} linkto={`/Hotel/${ele.name}/${ele._id}`} />
            ))
        ):(<p>No hotels available</p>)
        }
    </div>
    )
}

export default Hotels;