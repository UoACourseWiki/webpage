import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login.js";
import SignUp from "./Signup";
import ResetPassowrd from "./Reset";

import { signupPath, loginPath, resetPassword } from "../utils/URLPath";

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

      <Route path="/">
        <Redirect to="/"></Redirect>
      </Route>
    </Switch>
  );
}

export { Init as init };
