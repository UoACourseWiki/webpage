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
  Card,
  Switch,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import styles from "./SettingsPage.module.css";
import { useState } from "react";
import { Copyright } from "../utils/ViewComponent";
import { validPassword } from "../utils/validator";

const SettingsPage = ({ currentUser, updateInfo, isWaiting, submit }) => {
  const [enableSubmit, setEnableSubmit] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={styles.paper}>
        <Typography component="h1" variant="h5">
          Change your account settings
        </Typography>

        <form className={styles.form}>
          <TextField
            defaultValue={currentUser.email}
            variant="outlined"
            margin="normal"
            fullWidth
            inputProps={{ readOnly: true }}
          />{" "}
          <TextField
            defaultValue={currentUser.nickName}
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
            updatePsddValid={(v) => setEnableSubmit(v)}
          />
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

const PasswordInputText = ({ updateInfo, updatePsddValid }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const [conditions, setConditions] = useState({ final: true });
  function updateCondition(c) {
    setConditions({ ...conditions, ...c });
  }

  function handleRepeatInput(same) {
    var vfinal = Boolean(conditions.final & same);
    updatePsddValid(vfinal);

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
      <p>Leave New Password field empty if you do not want to change them</p>
      <div className={styles.pdContainer}>
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
