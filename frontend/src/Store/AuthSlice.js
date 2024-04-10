import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    UserData:null,
    status:false
}
const AuthSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.UserData = action.payload;
            state.status=true
        },
        logout:(state)=>{
            state.UserData=null;
            state.status=false;
        }
    }
})

export const {login,logout} = AuthSlice.actions
export default AuthSlice.reducer