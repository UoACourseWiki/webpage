import React, { useContext, useEffect } from "react";
import { UserContext } from "../utils/UserContext";

export default function LoginInfo(props) {
    // To call the setState hook here, useEffect() need to be called as example:
    // useEffect( () => {
    //     setUser(dummyLogin)
    // }, [user]);
    const [user] = useContext(UserContext);
    var textBody = <p></p>
    if (!user.username || user.username.length === 0 ) {
        textBody = <p>Please login!</p>
    } else {
        textBody = <p>Welcome, {user.username} !</p>
    }

    return textBody
}