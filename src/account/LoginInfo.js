import React from "react";
import { useCookies } from "react-cookie";

export default function LoginInfo(props) {

    const [cookies] = useCookies(["user"])

    var text = "Not logged in";

    if (cookies.user) { text = cookies.user.id }


    var textBody = <p> {text} <br /></p>

    return textBody
}