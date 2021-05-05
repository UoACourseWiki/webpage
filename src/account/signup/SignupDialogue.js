import { Button } from "@material-ui/core";

let nm = "nickName";
let em = "email";
let pd = "password";
let cpd = "confirmPassword";

const SignupDialogue = (updateInfo, handleSubmit) => {
  return (
    <div>
      <h2>Sign Up</h2>
      <label>Your Nick Name</label>
      <input
        type="text"
        onChange={(e) => updateInfo({ [nm]: e.target.value })}
      ></input>
      <br />
      <label>Email</label>
      <input
        type="text"
        onChange={(e) => updateInfo({ [em]: e.target.value })}
      ></input>
      <br />
      <label>Password</label>
      <input
        type="text"
        onChange={(e) => updateInfo({ [pd]: e.target.value })}
      ></input>
      <br />
      <label>Re-enter Password</label>
      <input
        type="text"
        onChange={(e) => updateInfo({ [cpd]: e.target.value })}
      ></input>
      <br />
      {/* <p>{errorMessage}</p> */}
      <Button onClick={handleSubmit}>Sign Up</Button>
    </div>
  );
};

export default SignupDialogue;
