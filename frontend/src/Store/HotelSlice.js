import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    myHotel:null,
    AllHotel:[]
}

const HotelSlice = createSlice({
    name:'myHotel',
    initialState,
    reducers:{
        addHotel:(state,action)=>{
            state.myHotel = action.payload
        },
        removeHotel:(state)=>{
            state.myHotel = null
        },
        AllHotels:(state,action)=>{
            state.AllHotel = action.payload;
        }
    }
})

export const {addHotel,removeHotel,AllHotels} = HotelSlice.actions

export default HotelSlice.reducer