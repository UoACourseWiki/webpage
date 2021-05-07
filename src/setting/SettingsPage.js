import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import LoginButton from "../account/LoginButton.js";


const SettingsPage =()=> {

    const [cookies, setCookie] = useCookies(["users"]);
    const [auth, setAuth] = useState("false");

    if (cookies.user == null) { return <LoginButton /> };

    return (
        <p>


        </p>
    )
}

export default SettingsPage