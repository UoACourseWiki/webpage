import { useState } from "react";
import { Modal, Button } from "@material-ui/core";

const SignupDialogue = (props) => {
    const [userInputNickname, setUserInputNickname] = useState("Nick Name");
    const [userInputEmail, setUserInputEmail] = useState("default@email.com");
    const [userInputPassword, setUserInputPassword] = useState("password");

    // const [info, setInfo] = useState({userInputEmail, userInputPassword});

    // const handleChange = (e) => {
    //     console.log(e.target.value)
    // }

    //This method should be replaced with a proper form submission / request action
    const handleSubmit = () => {
        var userSubmit = { userInputNickname, userInputEmail, userInputPassword };
        console.log(userSubmit);
        props.onClose();
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
            <input type="text" onChange={e => { /* Action need to be added */ }}></input>
            <br />
            <Button onClick={handleSubmit}>Sign Up</Button>
        </div>
    )
}

export default SignupDialogue;