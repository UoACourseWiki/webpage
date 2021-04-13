import React from "react";

import LoginInfo from "./LoginInfo";
import LoginButton from "./LoginButton.js";
import SignupButton from "./SignupButton.js";

import { UserContextProvider, UserContext } from "../subject/UserContext";

import * as dummyLogin from "./dummyJSON/dummyLogin.json";
import { useContext } from "react";

// const UserContext = react.createContext({dummyLogin});

const Login = () => {
    // const [user, setUser] = useContext(UserContext);
    // setUser({ dummyLogin });

    return <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
        }}>
            <span><LoginInfo /></span>
            <span><LoginButton /></span>
            <span><SignupButton /></span>
        </div>
}

export default Login;