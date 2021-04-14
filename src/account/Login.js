import { React } from "react";

import LoginInfo from "./LoginInfo";
import LoginButton from "./LoginButton.js";
import SignupButton from "./SignupButton.js";

// import { UserContext } from "../subject/UserContext";
import { LoginContext } from "../subject/LoginContext";
import { useContext } from "react";
import { Button } from "@material-ui/core";

// const UserContext = react.createContext({dummyLogin});

const Login = () => {
    // const [user, setUser] = useContext(UserContext);
    // setUser({ dummyLogin });

    const [isLoggedIn, setLoginStatus] = useContext(LoginContext);

    const handleLogOutClick = () => {
        setLoginStatus(false);
        window.location.reload();
    }

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

    return <div>{isLoggedIn ? renderWhenLogin() : renderWhenNotLogin()}</div>
}

export default Login;