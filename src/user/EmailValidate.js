import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { SuccessBar, FailBar } from "../utils/views/ResultBar";

import { axios732 } from "../utils/HTTPHelper";
import { Copyright } from "../utils/views/Copyright";

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

  // HTTP request
  const [showSuccessBar, setShowSuccessBar] = useState(false);
  const [showFailBar, setShowFailBar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const APIURL = "/Users/verify-email";

  useEffect(() => {
    axios732
      .post(APIURL, {
        email: email,
        token: token,
      })
      .then((res) => {
        setAlertMessage(res.data.message);
        setShowSuccessBar(true);
      })
      .catch((err) => {
        setAlertMessage("Email Verify Failed Please Try Again!");
        setShowFailBar(true);
      });
  }, []);

  function handleSuccessBar() {
    setShowSuccessBar(false);
  }

  function handleFailureBar() {
    setShowFailBar(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Email Verify
        </Typography>

        <SuccessBar
          open={showSuccessBar}
          clickClose={handleSuccessBar}
          message={alertMessage}
        />
        <FailBar
          open={showFailBar}
          clickClose={handleFailureBar}
          message={alertMessage}
        />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
