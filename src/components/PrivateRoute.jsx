import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useCookies } from "react-cookie";
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const [cookies] = useCookies(['user'])
    const [isLoadng, setIsLoading] = useState(true)
    const [isValid, setIsValid] = useState(false)

    if (cookies.session) {
        // console.log(cookies.session)
        const url = "http://localhost:9100/auth/check";
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${cookies.session}`
            },
        };
        axios.post(url, {}, config).then(response => {
            const roles = response.data.role.map(r => r.authority)
            if(roles.includes('admin')){
                console.log('admin')
            }
            // console.log(roles)
            setIsValid(response.data.isValid)
            setIsLoading(false)
        })
    } else return <Navigate to={'/login'} />

    return isLoadng ? (
        <div>Is Loading</div>
    ) : isValid === true ? (children) :
        (<Navigate to={'/login'} />)

}

export default PrivateRoute;