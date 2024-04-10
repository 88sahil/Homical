import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import likesSlice from "./LikeSlice";
import HotelSlice from "./HotelSlice";
const Store = configureStore({
    reducer:{
        auth:AuthSlice,
        likes:likesSlice,
        myhotel:HotelSlice
    }
})

export default Store