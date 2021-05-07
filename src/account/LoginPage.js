import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

// import ky from "ky";

import { useCookies } from "react-cookie";
import { axios732 } from "../utils/Macro";

const APIpathAuth = "/Users/authenticate";
//   "email": "ericzh718@gmail.com",
//   "password": "Test1234!",

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function LoginPage() {
    const classes = useStyles();
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [succeedMessage, SetSucceedMessage] = useState(false);
    const [failedMessage, SetFailedMessage] = useState(false);
    const [alertMessage, SetAlertMessage] = useState('');
    const [isWaiting, SetIsWaiting] = useState(false);

    //Following submit handler will be reimplemented by Axios
    const handleSubmit = async (event) => {
        event.preventDefault();
        await ky.post("http://127.0.0.1:5000/Users/authenticate", {
            json: {
                "email": email,
                "password": password
            },
            hooks: {
                afterResponse: [
                    async (request, options, response) => {
                        if (response.status === 401) {
                            await response.json().then((data) => SetAlertMessage(data.message));
                            SetIsWaiting(false);
                            SetFailedMessage(true);
                        } else if (response.status === 200) {
                            await response.json().then((data) => {
                                SetAlertMessage("SuccessFully Logged In!")
                                document.cookie = `jwt=${data.jwtToken}`;
                                document.cookie = `refreshToken=${data.refreshToken}`;
                            });
                            SetFailedMessage(false);
                            SetSucceedMessage(true);
                        } else {
                            SetAlertMessage("Unknown Error please try again!");
                            SetFailedMessage(true);
                            SetIsWaiting(false);
                        }
                    }
                ]
            }
        }).then(resp => resp.json()).catch((err) => {
            console.log(err);
        });

    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in to CourseWiki
                </Typography>
                <Snackbar open={succeedMessage} autoHideDuration={1000}>
                    <MuiAlert elevation={6} variant="filled" severity="success" action={<IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            SetSucceedMessage(false);
                            window.location.href = "/";
                        }}
                    >
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>}>{alertMessage}</MuiAlert>
                </Snackbar>
                <Snackbar open={failedMessage} autoHideDuration={1000}>
                    <MuiAlert elevation={6} variant="filled" severity="error" action={<IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            SetFailedMessage(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>}>{alertMessage}</MuiAlert>
                </Snackbar>
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={e => SetEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => SetPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        disabled={isWaiting}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/password_reset" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/join" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}