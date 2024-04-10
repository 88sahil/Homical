import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    likeCount:0
}
const likesSlice= createSlice({
    name:'likes',
    initialState,
    reducers:{
        initLike:(state,action)=>{
            state.likeCount = action.payload;
        },
        addlikes:(state,action)=>{
            state.likeCount = state.likeCount+1
        },
        dislikes:(state)=>{
            state.likeCount = state.likeCount-1;
        }
    }
})


export const {addlikes,dislikes,initLike} = likesSlice.actions

export default likesSlice.reducer;