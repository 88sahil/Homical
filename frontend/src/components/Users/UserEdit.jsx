import React from "react";
import {NavLink, Outlet, useNavigate} from 'react-router-dom'
import './Users.scss'
import LockResetIcon from '@mui/icons-material/LockReset';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
const UserEdit =()=>{
    return(
        <div className="umain">
            <div className="userRightNav">
                <NavLink className='urv' to="/UserEdit/updateuser">
                    <AccountCircleIcon/>
                    <a>User Details</a>
                </NavLink>
                <NavLink className='urv' to='/UserEdit/ChangePass'>
                    <LockResetIcon/>
                    <a>Reset Password</a>
                </NavLink>
                <NavLink className='urv' to='/UserEdit/UpdatePhoto'>
                    <AddAPhotoIcon />
                    <a>UpdatePhoto</a>
                </NavLink>
            </div>
            <div className="userMain">
                <Outlet/>
            </div>
        </div>
    )
}

export default UserEdit