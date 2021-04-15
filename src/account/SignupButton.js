import { useState } from "react";
import { Button } from "@material-ui/core";
import SignupDialogue from "./SignupDialogue";
import DialogueCointainer from "./DialogueContainer";

const SignupButton = () => {

    const [open, setOpen] = useState(false);

    // const handleOpen = () => {
    //     // console.log("onClick is called")
    //     setOpen(true)
    // };

    // const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
            {/* <SignupDialogue open={open} onClose={() => setOpen(false)} /> */}
            <DialogueCointainer open={open} onClose={() => setOpen(false)}>
                <SignupDialogue onClose={() => setOpen(false)}/>
            </DialogueCointainer>
        </div>
    )
}

export default SignupButton;