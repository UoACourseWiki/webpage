import { React, useEffect, useState } from "react";

import LoginInfo from "./LoginInfo";
import LoginButton from "./LoginButton.js";
import SignupButton from "./signup/SignupButton.js";
import { Button } from "@material-ui/core";
import { useCookies, withCookies } from "react-cookie";


const Login = () => {

    const [cookies, , removeCookie] = useCookies();
    const [auth, setAuth] = useState(false);

    const handleLogOutClick = () => {
        removeCookie("user", { path: "/"});
        window.location.reload();
    }

    useEffect(() => {
        const readCookie = () => {
            // console.log(typeof cookies.user)
            if (cookies.user !== undefined){
                setAuth(true);
            }
        }
        readCookie();
    }, [])

    const renderWhenNotLogin = () => (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
        }}>
            <span><p>Please Login</p></span>
            <span><LoginButton /></span>
            <span><SignupButton /></span>
        </div>
    )

    const renderWhenLogin = () => (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
        }}>
            <span><LoginInfo /></span>
            <span><Button onClick={handleLogOutClick}>LogOut</Button></span>
        </div>
    )

    return <div>{auth ? renderWhenLogin() : renderWhenNotLogin()}</div>
}

export default withCookies(Login);
