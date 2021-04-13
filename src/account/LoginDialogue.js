import { useState } from "react";
import { Modal, Button } from "@material-ui/core";

const LoginDialogue = (props) => {
    const [userInputEmail, setUserInputEmail] = useState("default@email.com");
    const [userInputPassword, setUserInputPassword] = useState("password");

    // const [info, setInfo] = useState({userInputEmail, userInputPassword});

    // const handleChange = (e) => {
    //     console.log(e.target.value)
    // }

    //This method should be replaced with a proper form submission / request action
    const handleSubmit = () => {
        var userSubmit = { userInputEmail, userInputPassword };
        console.log(userSubmit);
        props.onClose();
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
            <Button onClick={handleSubmit}>Login</Button>
        </div>
    )

}

export default LoginDialogue;