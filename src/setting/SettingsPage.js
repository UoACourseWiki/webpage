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
  Switch,
  Checkbox,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import styles from "./SettingsPage.module.css";
import { useState } from "react";
import { Copyright } from "../utils/views/Copyright";
import { validPassword } from "../utils/validator";
import PasswordHintCard from "../utils/views/PasswordHintCard";

const SettingsPage = ({ currentUser, updateInfo, isWaiting, submit }) => {
  const [newPswdValid, setNewPswdValid] = useState(false);
  const [needResetPswd, setNeedResetPswd] = useState(false);

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
          <FormControlLabel
            control={
              <Checkbox
                value="reset-password"
                color="primary"
                onClick={(e) => {
                  setNeedResetPswd(e.target.checked);
                }}
              />
            }
            label="Reset password"
          />
          <PasswordInputText
            show={needResetPswd}
            updateInfo={updateInfo}
            updatePswdValid={(v) => setNewPswdValid(v)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
            onClick={submit}
            disabled={(needResetPswd && !newPswdValid) || isWaiting}
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

const PswdminLength = 6;
const PasswordInputText = ({ show, updateInfo, updatePswdValid }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const [conditions, setConditions] = useState({ final: true });
  function updateCondition(c) {
    setConditions({ ...conditions, ...c });
  }

  function handleRepeatInput(same) {
    var vfinal = Boolean(conditions.final & same);
    updatePswdValid(vfinal);

    if (vfinal) {
      updateInfo({ pd: password, cpd: password });
    }
  }

  function handlePasdChange(e) {
    var passwd = e.target.value;
    var v = validPassword(passwd, PswdminLength);

    updateCondition(v);
    setPassword(passwd);
  }

  return (
    <div className={show ? styles.pdShow : styles.pdHidden}>
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
      <PasswordHintCard
        open={showHint}
        miniLength={PswdminLength}
        conditions={conditions}
      />
      <div className={styles.repeatPd}>
        <RepeatPassowrdInputText
          initPassword={password}
          onSame={handleRepeatInput}
        />
      </div>
    </div>
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
