import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import PrivateRoute from "../components/PrivateRoute";
import Home from "../components/site/Home";
import Logout from "../components/auth/Logout";
import Crypto from "../components/admin/Crypto";
import AddCrypto from "../components/admin/AddCrypto";
import Saldo from "../components/site/Saldo";
import EditCrypto from "../components/admin/EditCrypto";
import Portofolio from "../components/site/Portofolio";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/logout',
        element: <Logout/>
    },
    {
        path: '/',
        element: <PrivateRoute><Home /></PrivateRoute>
    },
    {
        path: '/admin',
        element: <PrivateRoute><Crypto/> </PrivateRoute>
    },
    {
        path:'/admin/add',
        element: <PrivateRoute><AddCrypto/></PrivateRoute>
    },
    {
        path:'/admin/edit/:id',
        element: <PrivateRoute><EditCrypto/></PrivateRoute>
    },
    {
        path:'/saldo',
        element: <PrivateRoute><Saldo/></PrivateRoute>
    },
    {
        path:'/portofolio',
        element: <PrivateRoute><Portofolio/></PrivateRoute>
    }
    // {
    //     path: '/',
    //     element: <Home />
    // }
])

export default router;