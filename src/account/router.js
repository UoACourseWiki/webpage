import { Switch, Route, Redirect } from "react-router-dom";

import { signupPath, loginPath } from "../utils/URLPath";
import Login from "./Login.js";
import SignUp from "./Signup";

function Init() {
  return (
    <Switch>
      <Route path={signupPath}>
        <SignUp />
      </Route>
      <Route path={loginPath}>
        <Login />
      </Route>

      <Route path="/">
        <Redirect to="/"></Redirect>
      </Route>
    </Switch>
  );
}

export { Init as init };
