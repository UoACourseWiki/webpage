import React, { useEffect, useState } from "react";
import {
    Button,
    TextField,
    FormControlLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Container,
    Box,
    Typography,
    CssBaseline,
    Checkbox,
    Card,
    Switch,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";


import { useCookies } from "react-cookie";
import LoginButton from "../account/LoginButton.js";


const SettingsPage = () => {
    const classes = useStyles();
    const [email, SetEmail] = useState('');
    const [nickName, SetNickName] = useState('');
    const [accept, SetAccept] = useState(false);
    const [password, SetPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertMessage, SetAlertMessage] = useState('');
    const [succeedMessage, SetSucceedMessage] = useState(false);
    const [failedMessage, SetFailedMessage] = useState(false);
    const [isWaiting, SetIsWaiting] = useState(false);

    const [cookies, setCookie] = useCookies(["users"]);
    const [auth, setAuth] = useState("false");

    if (cookies.user == null) { return <LoginButton /> };

    const { uuid, currentNickname, CurrentEmail } = cookies.user;


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {/*<Avatar className={classes.avatar}>*/}
                {/*    <LockOutlinedIcon />*/}
                {/*</Avatar>*/}
                <Typography component="h1" variant="h5">
                    Your Personal Account Settings
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
                        <CloseIcon fontSize="inherit" />
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
                        <CloseIcon fontSize="inherit" />
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
                        InputProps={{ readOnly: true }}
                    // onChange={e => SetEmail(e.target.value)}
                    />
                    <TextField
                        autoComplete={nickName}
                        name="nickName"
                        margin="normal"
                        variant="outlined"
                        required
                        fullWidth
                        id="nickName"
                        label="Nickname"
                        autoFocus
                        value={nickName}
                        onChange={e => SetNickName(e.target.value)}
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Repeat Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={accept} color="primary" onChange={() => SetAccept(!accept)} />}
                        label="Accept Term of Service"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        disabled={(!accept) || isWaiting}
                    >
                        Apply Changes
                    </Button>
                </form>
            </div>
        </Container>
    )
}

export default SettingsPage