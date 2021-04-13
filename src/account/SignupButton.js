import { useState } from "react";
import { Button } from "@material-ui/core";

//Need to be changed to signup dialouge
import SignupDialogue from "./SignupDialogue";

const SignupButton = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        // console.log("onClick is called")
        setOpen(true)
    };

    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Sign Up</Button>
            <SignupDialogue open={open} onClose={handleClose}/>
        </div>
    )
}

export default SignupButton;