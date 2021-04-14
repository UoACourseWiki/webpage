import { useState } from "react";
import { Button } from "@material-ui/core";
import LoginDialogue from "./LoginDialogue";
import DialogueCointainer from "./DialogueContainer";

const LoginButton = () => {

    const [open, setOpen] = useState(false);

    // const handleOpen = () => {
    //     // console.log("onClick is called")
    //     setOpen(true)
    // };

    // const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={() => setOpen(true)}>Login</Button>
            <DialogueCointainer open={open} onClose={() => setOpen(false)}>
                <LoginDialogue onClose={() => setOpen(false)} />
            </DialogueCointainer>
        </div>
    )
}

export default LoginButton;