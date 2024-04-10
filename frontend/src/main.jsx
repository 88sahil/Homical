import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Store from './Store/Store.js'
import { Provider } from 'react-redux'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import LoginPage from './Pages/Loginpage.jsx'
import Home from './Pages/Home.jsx'
import SignUpPage from './Pages/SingUpPage.jsx'
import ForgotPass from './components/Auth/ForgotPass.jsx'
import ResetPass from './components/Auth/ResetPass.jsx'
import HostPage from './Pages/HostPage.jsx'
import HotelPage from './Pages/HotelPage.jsx'
import LikedHotel from './components/Hotel/LikedHotel.jsx'
import UserEdit from './components/Users/UserEdit.jsx'
import UserDetails from './components/Users/UserDetails.jsx'
import ChangePass from './components/Users/ChangePass.jsx'
import UpdatePhoto from './components/Users/UpdatePhoto.jsx'
import HotelsPage from './components/ModifyHotels/HotelsPage.jsx'
import MyHotel from './components/ModifyHotels/MyHotel.jsx'
import HotelDetails from './components/ModifyHotels/HotelDetails.jsx'
import UpdateCover from './components/ModifyHotels/UpdateCover.jsx'
import Photos from './components/ModifyHotels/photos.jsx'
import ChangeAddress from './components/ModifyHotels/Change-Address.jsx'
import SingleHotel from './components/Hotel/Single-Hotel.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:([
      {
        path:'/',
        element:<Home/>,
        children:([
          {
            path:'/',
            element:<HotelPage/>
          },{
            path:'/likes',
            element:<LikedHotel/>
          },
        ])
      },
      {
        path:'/Hotel/:name/:id',
        element:<SingleHotel/>
      },
      {
        path:`/MyHotel/:id`,
        element:<MyHotel/>,
        children:([
          {
            path:`/MyHotel/:id/hotelData`,
            element:<HotelDetails/>
          },
          {
            path:'/MyHotel/:id/updateCover',
            element:<UpdateCover/>
          },
          {
            path:'/MyHotel/:id/photo',
            element:<Photos/>
          },{
            path:'/MyHotel/:id/address',
            element:<ChangeAddress/>
          }
        ])
      },
      {
        path:'/manageHotel',
        element:<HotelsPage />
      },
      {
        path:'/UserEdit',
        element:<UserEdit/>,
        children:([
          {
            path:'/UserEdit/updateuser',
            element:<UserDetails/>
          },{
            path:'/UserEdit/ChangePass',
            element:<ChangePass/>
          },{
            path:'/UserEdit/UpdatePhoto',
            element:<UpdatePhoto/>
          }
        ])
      },
      {
        path:'/login',
        element:<LoginPage/>
      },
      {
        path:'/signup',
        element:<SignUpPage/>
      },
      {
        path:'/forgot',
        element:<ForgotPass/>
      },
      {
        path:'/BecomeHost',
        element:<HostPage/>
      },
    ])
  },{
    path:'/resetpassword/:resettoken',
    element:<ResetPass/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
