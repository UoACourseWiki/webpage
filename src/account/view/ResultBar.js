import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";

const SuccessBar = ({ open, onClick, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={1000}>
      <MuiAlert
        elevation={6}
        variant="filled"
        severity="success"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClick}
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

const FailBar = ({ open, onClick, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={1000}>
      <MuiAlert
        elevation={6}
        variant="filled"
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClick}
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
