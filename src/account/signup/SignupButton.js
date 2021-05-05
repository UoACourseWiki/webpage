import { useState } from "react";
import { Button } from "@material-ui/core";
import SignUp from "./signup";
import DialogueCointainer from "../DialogueContainer";

const SignupButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Sign Up</Button>
      {/* <SignupDialogue open={open} onClose={() => setOpen(false)} /> */}
      <DialogueCointainer open={open} onClose={() => setOpen(false)}>
        <SignUp />
      </DialogueCointainer>
    </div>
  );
};

export default SignupButton;
