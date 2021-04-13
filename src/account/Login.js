import react from "react";

import LoginButton from "./LoginButton.js";
import SignupButton from "./SignupButton.js";

const Login = () => {
    return <div style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        }}>
        <span><LoginButton /></span>
        <span><SignupButton /></span>
    </div>
}

export default Login;