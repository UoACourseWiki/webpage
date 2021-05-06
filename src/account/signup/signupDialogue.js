import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { validEmail } from "./validator";

const SignupDialogue = ({ updateInfo, handleSubmit, error }) => {
  const [enableSubmit, setEnableSubmit] = useState(false);

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
        updateEnableSubmit={setEnableSubmit}
      />
      <br />

      <label>Password</label>
      <input
        type="text"
        onChange={(e) => updateInfo({ pd: e.target.value })}
      ></input>
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

const EmailInputText = ({ updateInfo, updateEnableSubmit }) => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailText, setEmailText] = useState("");

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
    setEmailText(text);
    updateEnableSubmit(valid);
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
      helperText={emailText}
    />
  );
};

export default SignupDialogue;
