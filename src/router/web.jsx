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
        element: <Crypto />
    },
    {
        path:'/admin/add',
        element: <AddCrypto/>
    },
    {
        path:'/saldo',
        element: <PrivateRoute><Saldo/></PrivateRoute>
    }
    // {
    //     path: '/',
    //     element: <Home />
    // }
])

export default router;