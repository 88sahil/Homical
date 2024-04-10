import React, { useEffect } from "react";
import './App.scss'
import {Outlet, useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { login } from "./Store/AuthSlice";
import axios from "axios";
const App =()=>{
  
    return(
      <div className="first">
        <Outlet/>
      </div>
    )
}
export default App