import React, {useEffect, useState} from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ky from "ky";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                CourseWiki
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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

export default function EmailValidate() {
    const classes = useStyles();
    const params = new URLSearchParams(location.search);
    const email = params.get("email");
    const token = params.get("token");
    const [succeedMessage, SetSucceedMessage] = useState(false);
    const [failedMessage, SetFailedMessage] = useState(false);
    const [alertMessage, SetAlertMessage] = useState('');

    useEffect(async () => {
        await ky.post("http://127.0.0.1:5000/Users/verify-email", {
            json: {
                "email": email,
                "token": token
            },
            hooks: {
                afterResponse: [
                    async (request, options, response) => {
                        if (response.status === 200) {
                            await response.json().then((data) => SetAlertMessage(data.message));
                            SetFailedMessage(false);
                            SetSucceedMessage(true);
                        } else if (response.status === 401) {
                            await response.json().then((data) => SetAlertMessage(data.message));
                            SetFailedMessage(true);
                        } else {
                            SetAlertMessage("Unknown Error please try again!");
                            SetFailedMessage(true);
                        }
                    }
                ]
            }
        }).then(resp => resp.json()).catch((err) => {
            console.log(err);
        });
    }, [])
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                {/*<Avatar className={classes.avatar}>*/}
                {/*    <LockOutlinedIcon />*/}
                {/*</Avatar>*/}
                <Typography component="h1" variant="h5">
                    Email Verify
                </Typography>

                <Snackbar open={succeedMessage} autoHideDuration={2000} onClose={() => {
                    window.location.href = "/"
                }}>
                    <MuiAlert elevation={6} variant="filled" severity="success">{alertMessage}</MuiAlert>
                </Snackbar>
                <Snackbar open={failedMessage} autoHideDuration={2000} onClose={() => {
                    window.location.href = "/"
                }}>
                    <MuiAlert elevation={6} variant="filled" severity="error">{alertMessage}</MuiAlert>
                </Snackbar>
                {/*<form className={classes.form}>*/}
                {/*    <TextField*/}
                {/*        variant="outlined"*/}
                {/*        margin="normal"*/}
                {/*        required*/}
                {/*        fullWidth*/}
                {/*        id="email"*/}
                {/*        label="Email Address"*/}
                {/*        name="email"*/}
                {/*        autoComplete="email"*/}
                {/*        autoFocus*/}
                {/*        value={email}*/}
                {/*        onChange={e => SetEmail(e.target.value)}*/}
                {/*    />*/}
                {/*    <Button*/}
                {/*        type="submit"*/}
                {/*        fullWidth*/}
                {/*        variant="contained"*/}
                {/*        color="primary"*/}
                {/*        className={classes.submit}*/}
                {/*        onClick={handleSubmit}*/}
                {/*        disabled={isWaiting}*/}
                {/*    >*/}
                {/*        Send password reset email*/}
                {/*    </Button>*/}
                {/*</form>*/}
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}