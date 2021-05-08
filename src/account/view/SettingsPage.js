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
import styles from "./SettingsPage.module.css";
import TokenRefresher from "../../utils/TokenRefresher.js"

import { useState, useEffect } from "react";
import { validPassword } from "./validator";
import { Copyright } from "../../utils/ViewComponent";
import { useCookies } from "react-cookie";

const SettingsPage = ({ updateInfo, isWaiting, submit }) => {
    const [enableSubmit, setEnableSubmit] = useState(true);
    const [cookies, setCookie] = useCookies(["user"]);
    let _currentUser = cookies.user;
    // console.log(cookies.user)

    const [validInputs, setValidInputs] = useState({
        pd: false,
    });

    useEffect( async () => {
        try {
            let _user = await TokenRefresher(_currentUser);
            if (typeof _user !== 'undefined') {
                console.log(_user)
                setCookie("user", _user, { path: "/" })
            }
            ;
        } catch (e) { console.log(e) }
    }, [])

    function updateInputsValid(field) {
        var result = { ...validInputs, ...field };
        setValidInputs(result);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={styles.paper}>
                <Typography component="h1" variant="h5">
                    Change your account settings
          </Typography>

                <form className={styles.form}>
                    <EmailInputText
                        currentUser={cookies.user}
                        updateInfo={updateInfo}
                    />
                    <TextField
                        defaultValue={cookies.user.nickName}
                        name="nickName"
                        margin="normal"
                        variant="outlined"
                        required
                        fullWidth
                        id="nickName"
                        label="Nickname"
                        autoFocus
                        onChange={(e) => updateInfo({ nm: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="Old password"
                        label="Old Password"
                        type="password"
                        id="oldpassword"
                        autoComplete="current-password"
                        onChange={(e) => updateInfo({ opd: e.target.value })}
                    />
                    <PasswordInputText
                        updateInfo={updateInfo}
                        enableSubmit={(valid) => {
                            updateInputsValid(valid);
                        }}
                    />
                    {/* <FormControlLabel
                        control={
                            <Checkbox
                                checked={validInputs.tm}
                                color="primary"
                                onChange={(e) => {
                                    updateInfo({ at: e.target.checked });
                                    updateInputsValid({ tm: !validInputs.tm });
                                }}
                            />
                        }
                        label="Accept Term of Service"
                    /> */}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={styles.submit}
                        onClick={submit}
                        disabled={!enableSubmit || isWaiting}
                    >
                        Apply Changes
            </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
};

const EmailInputText = ({ currentUser, updateInfo }) => {

    const _email = currentUser.email;
    const _htxt = "You cannot change your email";
    updateInfo({ em: _email });

    return (
        <TextField
            defaultValue={_email}
            helperText={_htxt}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            inputProps={{ readOnly: true, }}
        />
    );
};

const PasswordInputText = ({ updateInfo, enableSubmit }) => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const [conditions, setConditions] = useState({ final: true });
    function updateCondition(c) {
        setConditions({ ...conditions, ...c });
    }

    function handleRepeatInput(same) {
        var vfinal = Boolean(conditions.final & same);
        enableSubmit({ pd: vfinal });

        if (vfinal) {
            updateInfo({ pd: password, cpd: password });
        }
    }

    function handlePasdChange(e) {
        var passwd = e.target.value;
        var v = validPassword(passwd, miniLength);

        updateCondition(v);
        setPassword(passwd);
    }

    return (
        <>
            <div className={styles.pdContainer}>
                <p>Leave New Password field empty if you do not want to change them</p>
                <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    onChange={handlePasdChange}
                    error={!conditions.final}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    fullWidth
                    placeholder="Password"
                />
                <FormControlLabel
                    control={
                        <Switch
                            className={styles.hintSwt}
                            size="small"
                            color="primary"
                            onChange={() => {
                                setShowHint(!showHint);
                            }}
                        />
                    }
                    label="Hint"
                />
            </div>
            <PdRequirementsCard open={showHint} conditions={conditions} />
            <div className={styles.repeatPd}>
                <RepeatPassowrdInputText
                    initPassword={password}
                    onSame={handleRepeatInput}
                />
            </div>
        </>
    );
};

const miniLength = 6;
const PdRequirementsCard = ({ open, conditions }) => {
    return (
        <Card className={open ? styles.hintShow : styles.hintHidden}>
            <p
                id="length"
                className={conditions.length ? styles.pdValid : styles.pdInvalid}
            >
                Minimum <b>{miniLength} characters</b>
            </p>
            <p
                id="letter"
                className={conditions.letter ? styles.pdValid : styles.pdInvalid}
            >
                <b>Lowercase </b> & <b> Capital (Uppercase) </b> letters
        </p>
            <p
                id="symbol"
                className={conditions.symbol ? styles.pdValid : styles.pdInvalid}
            >
                A <b>symbol</b> letter
        </p>
            <p
                id="number"
                className={conditions.number ? styles.pdValid : styles.pdInvalid}
            >
                A <b>number</b>
            </p>
        </Card>
    );
};

const RepeatPassowrdInputText = ({ initPassword, onSame }) => {
    const [rPasd, setRpasd] = useState("");
    const [same, setSame] = useState(true);
    const [htxt, setHtxt] = useState("");

    const handleChange = (e) => {
        var input = e.target.value;
        var v = initPassword === input;

        setRpasd(input);
        setSame(v);
        setHtxt(v ? "" : "password mismatch");
        onSame(v);
    };

    return (
        <TextField
            value={rPasd}
            error={!same}
            onChange={handleChange}
            helperText={htxt}
            variant="outlined"
            type="password"
            fullWidth
            required
            label="Repeat Password"
        />
    );
};

export default SettingsPage;