import { useState, useContext } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import { UserContext } from "../utils/UserContext";
import { LoginContext } from "../utils/LoginContext";

import dummyLogin from "./dummyJSON/dummyLogin.json"

const LoginDialogue = (props) => {
    const [userInputEmail, setUserInputEmail] = useState("");
    const [userInputPassword, setUserInputPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [, setUser] = useContext(UserContext);
    const [, setLoginStatus] = useContext(LoginContext);

    // const [info, setInfo] = useState({userInputEmail, userInputPassword});

    // const handleChange = (e) => {
    //     console.log(e.target.value)
    // }



    //This method should be replaced with a proper form submission / request action
    const handleSubmit = () => {

        // following block of code is for test purpose only
        // if (userInputEmail === "" && userInputPassword === "") {
        //     setUserInputEmail("user@example.com");
        //     setUserInputPassword("Test123!");
        // }
        // var userSubmit = { userInputEmail, userInputPassword };
        // console.log(userSubmit);
        // test code ends

        axios.post("https://localhost:5001/Auth/Login", {
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
            <h2>LOGIN</h2>
            <label>Email</label>
            <input type="text" onChange={e => setUserInputEmail(e.target.value)}></input>
            <br />
            <label>Password</label>
            <input type="text" onChange={e => setUserInputPassword(e.target.value)}></input>
            <br />
            <p>{errorMessage}</p>
            <Button onClick={handleSubmit}>Login</Button>
        </div>
    )

}

export default LoginDialogue;