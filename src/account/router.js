import { Switch, Route, Redirect } from "react-router-dom";

import {
  signupPath,
  loginPath,
  forgetPswdPath,
  resetPswdPath,
} from "../utils/URLPath";
import Login from "./Login.js";
import SignUp from "./Signup";
import ForgetPassowrd from "./ForgetPassword";
import ResetPassword from "./ResetPassword";

function Init() {
  return (
    <Switch>
      <Route path={signupPath}>
        <SignUp />
      </Route>
      <Route path={loginPath}>
        <Login />
      </Route>
      <Route path={forgetPswdPath}>
        <ForgetPassowrd />
      </Route>
      <Route path={resetPswdPath}>
        <ResetPassword />
      </Route>

      <Route path="/">
        <Redirect to="/"></Redirect>
      </Route>
    </Switch>
  );
}

export { Init as init };
