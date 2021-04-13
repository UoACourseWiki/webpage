import react from "react";

import LoginInfo from "./LoginInfo";
import LoginButton from "./LoginButton.js";
import SignupButton from "./SignupButton.js";

import * as dummyLogin from "./dummyJSON/dummyLogin.json";

const UserContext = react.createContext({dummyLogin});

const Login = () => {
    return <UserContext.Provider value = {{user: dummyLogin}}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                }}>
                <span><LoginInfo /></span>
                <span><LoginButton /></span>
                <span><SignupButton /></span>
            </div>
    </UserContext.Provider>
}

export default Login;