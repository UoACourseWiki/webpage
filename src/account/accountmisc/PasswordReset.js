import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ky from "ky";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

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

export default function PasswordReset() {
    const classes = useStyles();
    const [email, SetEmail] = useState('');
    const [succeedMessage, SetSucceedMessage] = useState(false);
    const [failedMessage, SetFailedMessage] = useState(false);
    const [alertMessage, SetAlertMessage] = useState('');
    const [isWaiting, SetIsWaiting] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        await ky.post("http://127.0.0.1:5000/Users/forgot-password", {
            json: {
                "email": email
            },
            hooks: {
                afterResponse: [
                    async (request, options, response) => {
                        if (response.status === 200) {
                            await response.json().then((data) => SetAlertMessage(data.message));
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
                {/*<Avatar className={classes.avatar}>*/}
                {/*    <LockOutlinedIcon />*/}
                {/*</Avatar>*/}
                <Typography component="h1" variant="h5">
                    Reset your password
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        disabled={isWaiting}
                    >
                        Send password reset email
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}