import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";

const SuccessBar = ({ open, clickClose, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={1500} onClose={clickClose}>
      <MuiAlert
        elevation={6}
        variant="filled"
        severity="success"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={clickClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

const FailBar = ({ open, clickClose, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={1500} onClose={clickClose}>
      <MuiAlert
        elevation={6}
        variant="filled"
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={clickClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export { SuccessBar, FailBar };
