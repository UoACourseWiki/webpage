import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login.js";
import SignUp from "./Signup";
import ResetPassowrd from "./Reset";

import { signupPath, loginPath, resetPassword, profilePath } from "../utils/URLPath";
import Settings from "./setting/Settings.js";

function Init() {
  return (
    <Switch>
      <Route path={signupPath}>
        <SignUp />
      </Route>
      <Route path={loginPath}>
        <Login />
      </Route>
      <Route path={resetPassword}>
        <ResetPassowrd />
      </Route>
      <Route path={profilePath}>
        <Settings />
      </Route>
      <Route path="/">
        <Redirect to="/"></Redirect>
      </Route>
    </Switch>
  );
}

export { Init as init };
