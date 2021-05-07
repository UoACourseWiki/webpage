import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { axios732 } from "../utils/Macro";
import { useCookies, withCookies } from "react-cookie";

import { signupPath } from "../utils/URLPath";

const LoginDialogue = (props) => {
    const [userInputEmail, setUserInputEmail] = useState("");
    const [userInputPassword, setUserInputPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [, setCookie] = useCookies("user");

    const history = useHistory();

    const APIpathAuth = "/Users/authenticate";
    //   "email": "ericzh718@gmail.com",
    //   "password": "Test1234!",



    const handleSubmit = () => {

        axios732.post(APIpathAuth, {
            "email": userInputEmail,
            "password": userInputPassword
        })
            .then((res) => {
                setCookie('user', res.data, { path: "/" });
                setTimeout(() => { props.onClose() }, 2000);
                window.location.reload();
            })
            .catch((err) => {
                const errorMsg = "Login Failed! Please check your Email or Password";
                setErrorMessage(errorMsg);
                console.log("this is error:" + err.data)
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
            <p>Do not have an account yet?<Button
                        onClick={() => {
                            history.push(signupPath);
                        }}
                    >
                        Sign Up
          </Button></p>
            <p>Forget your password?</p>
            <Button onClick={handleSubmit}>Login</Button>
        </div>
    )

}

export default withCookies(LoginDialogue);