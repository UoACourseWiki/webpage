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
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import styles from "../../setting/SettingsPage.module.css";
import { useState } from "react";
import { Copyright } from "../../utils/views/Copyright";
import { validPassword } from "../../utils/validator";
import PasswordHintCard from "../../utils/views/PasswordHintCard";

export default function ResetPasswordPage({
  initEmail,
  updateInfo,
  isWaiting,
  submit,
}) {
  const [newPswdValid, setNewPswdValid] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={styles.paper}>
        <Typography component="h1" variant="h5">
          Reset your password
        </Typography>

        <form className={styles.form}>
          <TextField
            style={{ marginTop: "10px", marginBottom: "10px" }}
            disabled
            defaultValue={initEmail}
            label="Email Address"
            id="outlined-disabled"
            variant="outlined"
            fullWidth
          />
          <PasswordInputText
            updateInfo={updateInfo}
            updatePswdValid={(v) => setNewPswdValid(v)}
          />
          <Button
            className={styles.submit}
            fullWidth
            variant="contained"
            color="primary"
            onClick={submit}
            disabled={!newPswdValid || isWaiting}
          >
            Send password reset email
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const passwordMinLength = 6;

const PasswordInputText = ({ updateInfo, updatePswdValid }) => {
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
    var v = validPassword(passwd, passwordMinLength);

    updateCondition(v);
    setPassword(passwd);
  }

  return (
    <div>
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
        miniLength={passwordMinLength}
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
