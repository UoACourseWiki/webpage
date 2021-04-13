import React, { useContext, useEffect } from "react";
import { UserContext } from "../subject/UserContext";

export default function LoginInfo(props) {
    // To call the setState hook here, useEffect() need to be called as example:
    // useEffect( () => {
    //     setUser(dummyLogin)
    // }, [user]);
    const [user] = useContext(UserContext);
    const userName = user.username;

    return <p>
        Welcome, {userName} !
    </p>
}