import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import styles from "./signupDialogue.module.css";

import { useState } from "react";
import { validEmail, validPassword } from "./validator";

const SignupDialogue = ({ updateInfo, handleSubmit, error }) => {
  const [enableSubmit, setEnableSubmit] = useState(false);

  const [validInputs, setValidInputs] = useState({ em: false, pd: false });
  function updateInputsValid(field) {
    var result = { ...validInputs, ...field };
    setValidInputs(result);
    setEnableSubmit(Boolean(result.em & result.pd));
  }

  return (
    <div>
      <h2>Sign Up</h2>

      <label>Your Nick Name</label>
      <input
        type="text"
        onChange={(e) => updateInfo({ nm: e.target.value })}
      ></input>
      <br />
      <EmailInputText
        updateInfo={updateInfo}
        enableSubmit={(valid) => {
          updateInputsValid(valid);
        }}
      />
      <br />
      <PasswordInputText
        updateInfo={updateInfo}
        enableSubmit={(valid) => {
          updateInputsValid(valid);
        }}
      />
      <br />
      <label>Re-enter Password</label>
      <input
        type="text"
        onChange={(e) => updateInfo({ cpd: e.target.value })}
      ></input>
      <br />
      <p style={{ color: "red" }}>{error}</p>
      <Button disabled={!enableSubmit} onClick={handleSubmit}>
        Sign Up
      </Button>
    </div>
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
      variant="outlined"
      label="Email"
      value={email}
      error={!emailValid}
      onBlur={handleEmailBlur}
      onChange={(e) => {
        setEmail(e.target.value);
      }}
      helperText={htxt}
    />
  );
};

const PasswordInputText = ({ updateInfo, enableSubmit }) => {
  const miniLength = 6;
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [validation, setValidation] = useState({ final: true });
  function updateValidation(filed) {
    setValidation({ ...validation, ...filed });
  }

  const handlePasdChange = (e) => {
    var input = e.target.value;
    var result = validPassword(input, miniLength);

    updateValidation(result);
    enableSubmit({ pd: result.final });

    if (result.final) {
      setPassword(input);
      updateInfo({ pd: input });
    }
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        onChange={handlePasdChange}
        error={!validation.final}
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
        labelWidth={70}
      />
      <div id="message">
        <h4>Password must contain the following:</h4>

        <p
          id="length"
          className={validation.length ? styles.pdValid : styles.pdInvalid}
        >
          Minimum <b>{miniLength} characters</b>
        </p>
        <p
          id="letter"
          className={validation.letter ? styles.pdValid : styles.pdInvalid}
        >
          A <b>lowercase</b> letter
        </p>
        <p
          id="capital"
          className={validation.capital ? styles.pdValid : styles.pdInvalid}
        >
          A <b>capital (uppercase)</b> letter
        </p>
        <p
          id="number"
          className={validation.number ? styles.pdValid : styles.pdInvalid}
        >
          A <b>number</b>
        </p>
      </div>
    </FormControl>
  );
};

export default SignupDialogue;
