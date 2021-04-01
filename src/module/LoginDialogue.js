import { useState } from "react";
import { Modal, Button } from "@material-ui/core";

const LoginDialogue = (props) => {
    // console.log("I'm called!");
    const [userInputEmail, setUserInputEmail] = useState("default@email.com");
    const [userInputPassword, setUserInputPassword] = useState("password");

    // const [info, setInfo] = useState({userInputEmail, userInputPassword});

    // const handleChange = (e) => {
    //     console.log(e.target.value)
    // }

    //This method should be replaced with a proper form submission / request action
    const handleSubmit = () => {
        var userSubmit = {userInputEmail, userInputPassword};
        console.log(userSubmit);
        props.onClose();
    }

    //Following is an temp inline style sheet, please replace with material-ui makeStyle(theme) method
    const modalContentStyle = {
        backgroundColor: "#fefefe",
        margin: "auto",
        padding: "20px",
        border: "1px solid #888",
        width: "80%",
    }


    const modalContent = 
        <div style={modalContentStyle}>
            <h2>LOGIN</h2>
            <label>Email</label>
            <input type="text" onChange={e=>setUserInputEmail(e.target.value)}></input>
            <br/>
            <label>Password</label>
            <input type="text" onChange={e=>setUserInputPassword(e.target.value)}></input>
            <br/>
            <Button onClick={handleSubmit}>Login</Button>
        </div>
    

    return (
        <Modal
            open = {props.open}
            onClose = {props.onClose}
        >
            {modalContent}
        </Modal>
    )
}

export default LoginDialogue;