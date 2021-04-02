import { useState } from "react";
import { Button } from "@material-ui/core";
import LoginDialogue from "./LoginDialogue";

const LoginButton = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        // console.log("onClick is called")
        setOpen(true)
    };

    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Login</Button>
            <LoginDialogue open={open} onClose={handleClose}/>
        </div>
    )
}

export default LoginButton;