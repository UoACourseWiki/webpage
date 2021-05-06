import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import { loginPath } from "../../utils/URLPath";
import { useHistory } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function SuccessDialogue({ open, close }) {
  const history = useHistory();

  function redirectToLogin() {
    history.push(loginPath);
    close();
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={close}
      >
        <DialogTitle id="signup-success-dialogue-title">
          {"🤗 Registered!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="signup-success-dialogue-text">
            Go to your mailbox to finish email verification~~{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={redirectToLogin} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
