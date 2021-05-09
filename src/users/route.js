import { Switch, Route, Redirect } from "react-router-dom";

import {
  forgetPswdPath,
  resetPswdPath,
  emailValidatePath,
} from "../utils/URLPath";

import ForgetPassowrd from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import EmailValidate from "./EmailValidate";

function Init() {
  return (
    <Switch>
      <Route path={emailValidatePath}>
        <EmailValidate />
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
