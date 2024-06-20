import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './Pages/Home/Home';

import Root from './Pages/Root/Root';

import { HelmetProvider } from 'react-helmet-async';
import Login from './Pages/Login & Register/Login';
import Register from './Pages/Login & Register/Register';
import ContextComponent from './Context/ContextComponent';
import ErrorPage from './Pages/Shared/ErrorPage';
import PrivateRoute from './Pages/Private/PrivateRoute';
import Add from './Pages/Private/Add';
import ViewDetails from './Pages/Private/ViewDetails';
import Update from './Pages/Private/Update';
import UserProfile from './Pages/Private/UserProfile';
import ManageMyPost from './Pages/Private/ManageMyPost';
import NeedVolunteer from './Pages/Need Volunteer/NeedVolunteer';
import BeVolunteer from './Pages/Private/BeVolunteer';
import SeeRequestsToThisPost from './Pages/Private/SeeRequestsToThisPost';
import Feedback from './Pages/Private/Feedback';

const router = createBrowserRouter([
  {
    //https://server-fbz4si1aj-abdullah-faiazs-projects.vercel.app
    path: "/",
    element: <Root></Root>,
    errorElement:<ErrorPage/>,
    children:[
      {
        index: "/",
        element: <Home/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element: <Register/>
      },
      {
        path: "/needVolunteer",
        element: <NeedVolunteer/>,
        loader: () => fetch("https://volunteer-hub-beryl.vercel.app/postCount")
      },
      {
        path: "/add",
        element: <PrivateRoute><Add/></PrivateRoute>
      },
      {
        path: "/userProfile",
        element: <PrivateRoute><UserProfile/></PrivateRoute>
      },
      {
        path: "/feedback/:id",
        element: <PrivateRoute><Feedback/></PrivateRoute>
      },
      {
        path: "/beVolunteer/:id",
        element: <PrivateRoute><BeVolunteer/></PrivateRoute>,
        loader: ({params}) => fetch(`https://volunteer-hub-beryl.vercel.app/beVolunteer/${params.id}`)
      },
      {
        path:"update/:id",
        element: <PrivateRoute><Update/></PrivateRoute>,
        loader: ({params}) => fetch(`https://volunteer-hub-beryl.vercel.app/update/${params.id}`)
      },
      // {
      //   path: "/myProducts/:email",
      //   element: <PrivateRoute>  <MyList/> </PrivateRoute>,
      //   loader: ({params}) => fetch(`https://volunteer-hub-beryl.vercel.app/products/${params.email}`)
      // },
      // {
        // path: `/myProducts/:email`,
        // path: `/myProducts/:color`,
        // element: <PrivateRoute>  <MyList/> </PrivateRoute>,
        // loader: ({params}) => fetch(`https://volunteer-hub-beryl.vercel.app/myProducts?user_email=${params.email}`)
        // loader: ({params}) => fetch(`https://volunteer-hub-beryl.vercel.app/myProducts?user_email=${user.email}&color=${params.color}`)
      // },
      {
        path: `/myPosts/:email`,
        // path: `/myProducts/:color`,
        element: <PrivateRoute>  <ManageMyPost/> </PrivateRoute>,
        // loader: ({params}) => fetch(`https://volunteer-hub-beryl.vercel.app/myProducts?user_email=${user.email}&color=${params.color}`)
      },

      {
        path: "/postDetails/:id",
        element: <PrivateRoute>  <ViewDetails/> </PrivateRoute>,
        loader: ({params}) => fetch(`https://volunteer-hub-beryl.vercel.app/postDetails/${params.id}`)
      },
      {
        path: "/seeRequestsToThisPost/:id",
        element: <PrivateRoute>  <SeeRequestsToThisPost/> </PrivateRoute>,
        loader: ({params}) => fetch(`https://volunteer-hub-beryl.vercel.app/allReq/${params.id}`)
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
    <ContextComponent>
      <RouterProvider router={router} />
    </ContextComponent>
    </HelmetProvider>
  </React.StrictMode>,
)
