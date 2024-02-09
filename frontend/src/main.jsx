import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import LoginPage from './Pages/Loginpage.jsx'
import Home from './Pages/Home.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:([
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element:<LoginPage/>
      }
    ])
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
