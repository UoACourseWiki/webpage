import React, { useContext } from "react";
import { Cookies, useCookies } from "react-cookie";
// import { UserContext } from "../utils/UserContext";

export default function LoginInfo(props) {
    // To call the setState hook here, useEffect() need to be called as example:
    // useEffect( () => {
    //     setUser(dummyLogin)
    // }, [user]);
    // const [user] = useContext(UserContext);

    const [cookies, setCookie, removeCookie] = useCookies(["user"])

    var text = "Not logged in";

    if (cookies.user) { text = cookies.user.id }


    var textBody = <p> {text} <br /></p>
    // if (!user.username || user.username.length === 0 ) {
    //     textBody = <p>Something goes wrong...</p>
    // } else {
    //     textBody = <p>Welcome, {user.username} !</p>
    // }

    return textBody
}