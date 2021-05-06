import { React, useEffect, useState } from "react";

import LoginInfo from "./LoginInfo";
import LoginButton from "./LoginButton.js";
import SignupButton from "./signup/SignupButton.js";

// import { UserContext } from "../utils/UserContext";
// import { LoginContext } from "../utils/LoginContext";
import { useContext } from "react";
import { Button } from "@material-ui/core";
import { Cookies, useCookies, withCookies } from "react-cookie";

// const UserContext = react.createContext({dummyLogin});

const Login = () => {
    // const [user, setUser] = useContext(UserContext);
    // setUser({ dummyLogin });

    const [cookies, setCookie, removeCookie] = useCookies();
    const [auth, setAuth] = useState(false);
    // const [isLoggedIn, setLoginStatus] = useContext(LoginContext);
    // var loginStatus = new Boolean(false);
    // setCookie('loginStatus', loginStatus, { path: "/" });
    // console.log(typeof cookies.loginStatus);

    const handleLogOutClick = () => {
        // setLoginStatus(false);
        removeCookie("user", { path: "/"});
        window.location.reload();
    }

    const readCookie = () => {
        console.log(typeof cookies.user)
        if (cookies.user != undefined){
            setAuth(true);
        }
    }

    useEffect(() => {
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
