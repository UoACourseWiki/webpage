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
  CardContent,
  Grid,
  Link
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import styles from "./SignupPage.module.css";

import { useState } from "react";
import { validEmail, validPassword } from "../../utils/validator";
import { Copyright } from "../../utils/ViewComponent";
import { loginPath } from "../../utils/URLPath";

const SignupPage = ({ updateInfo, isWaiting, submit }) => {
  const [enableSubmit, setEnableSubmit] = useState(false);

  const [validInputs, setValidInputs] = useState({
    em: false,
    pd: false,
    tm: false,
  });

  function updateInputsValid(field) {
    var result = { ...validInputs, ...field };

    setValidInputs(result);
    setEnableSubmit(Boolean(result.em & result.pd & result.tm));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={styles.paper}>
        <Typography component="h1" variant="h5">
          Sign up to CourseWiki
        </Typography>

        <form className={styles.form}>
          <TextField
            autoComplete="name"
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
          <EmailInputText
            updateInfo={updateInfo}
            enableSubmit={(valid) => {
              updateInputsValid(valid);
            }}
          />
          <PasswordInputText
            updateInfo={updateInfo}
            enableSubmit={(valid) => {
              updateInputsValid(valid);
            }}
          />
          <FormControlLabel
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
          />
          <Grid className={styles.grid} container>
            <Grid item>
              <Link href={loginPath} variant="body2">
                {"Already have account? Login"}
              </Link>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
            onClick={submit}
            disabled={!enableSubmit || isWaiting}
          >
            Sign up
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const EmailInputText = ({ updateInfo, enableSubmit }) => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [htxt, setHtxt] = useState("");

  const handleEmailBlur = () => {
    var text = "";
    var valid = validEmail(email);
    if (valid) {
      updateInfo({ em: email });
    } else {
      text =
        email.length === 0 ? "this field is required" : "email is not valid";
    }

    setEmailValid(valid);
    setHtxt(text);
    enableSubmit({ em: valid });
  };

  return (
    <TextField
      value={email}
      error={!emailValid}
      onBlur={handleEmailBlur}
      onChange={(e) => {
        setEmail(e.target.value);
      }}
      helperText={htxt}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label="Email Address"
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
    <Card style={{ marginTop: "4px" }}>
      <CardContent className={open ? styles.hintShow : styles.hintHidden}>
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
      </CardContent>
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

export default SignupPage;
