import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { axios732, HTTP_OK } from "../utils/Macro";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        CourseWiki
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function EmailValidate() {
  const classes = useStyles();
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  const token = params.get("token");
  const [succeedMessage, SetSucceedMessage] = useState(false);
  const [failedMessage, SetFailedMessage] = useState(false);
  const [alertMessage, SetAlertMessage] = useState("");

  const APIURL = "/Users/verify-email";

  useEffect(() => {
    axios732
      .post(APIURL, {
        email: email,
        token: token,
      })
      .then((res) => {
        if (res.status === HTTP_OK) {
          SetAlertMessage(res.data.message);
          SetFailedMessage(false);
          SetSucceedMessage(true);
        } else {
          SetAlertMessage("Email Verify Failed Please Try Again!");
          SetFailedMessage(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Email Verify
        </Typography>

        <Snackbar
          open={succeedMessage}
          autoHideDuration={2000}
          onClose={() => {
            window.location.href = "/";
          }}
        >
          <MuiAlert elevation={6} variant="filled" severity="success">
            {alertMessage}
          </MuiAlert>
        </Snackbar>
        <Snackbar
          open={failedMessage}
          autoHideDuration={2000}
          onClose={() => {
            window.location.href = "/";
          }}
        >
          <MuiAlert elevation={6} variant="filled" severity="error">
            {alertMessage}
          </MuiAlert>
        </Snackbar>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
