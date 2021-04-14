import { useState, useContext } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import { UserContext } from "../subject/UserContext";
import { LoginContext } from "../subject/LoginContext";

import dummyLogin from "./dummyJSON/dummyLogin.json"


const SignupDialogue = (props) => {
    const [userInputNickname, setUserInputNickname] = useState("Nick Name");
    const [userInputEmail, setUserInputEmail] = useState("default@email.com");
    const [userInputPassword, setUserInputPassword] = useState("password");
    const [userInputPassword2, setUserInputPassword2] = useState("This is some thing would never match");
    const [errorMessage, setErrorMessage] = useState("");
    const [, setUser] = useContext(UserContext);
    const [, setLoginStatus] = useContext(LoginContext);

    //This method should be replaced with a proper form submission / request action
    const handleSubmit = () => {
        // var userSubmit = { userInputNickname, userInputEmail, userInputPassword };
        // console.log(userSubmit);
        // props.onClose();

        const passwordInputMatch = (pass1, pass2) => {
            if (pass1 === pass2) {return true}
            else {return false}
        }

        if (!passwordInputMatch(userInputPassword, userInputPassword2)) {
            setErrorMessage("Password did not match");
            return;
        }

        axios.post("https://localhost:5001/Auth/Register", {
            "username": userInputNickname,
            "email": userInputEmail,
            "password": userInputPassword
        })
            .then((res) => {
                setUser(dummyLogin.user);
                setLoginStatus(true);
                setTimeout(() => { props.onClose() }, 2000);
            })
            .catch((err) => {
                // Error message handelling need to be smarter
                const error = err.response.data.errors;
                const errorMsg = JSON.stringify(error);
                setErrorMessage(errorMsg);
        })
    }

    return (
        <div>
            <h2>Sign Up</h2>
            <label>Your Nick Name</label>
            <input type="text" onChange={e => setUserInputNickname(e.target.value)}></input>
            <br />
            <label>Email</label>
            <input type="text" onChange={e => setUserInputEmail(e.target.value)}></input>
            <br />
            <label>Password</label>
            <input type="text" onChange={e => setUserInputPassword(e.target.value)}></input>
            <br />
            <label>Re-enter Password</label>
            <input type="text" onChange={e => setUserInputPassword2(e.target.value)}></input>
            <br />
            <p>{errorMessage}</p>
            <Button onClick={handleSubmit}>Sign Up</Button>
        </div>
    )
}

export default SignupDialogue;