import { Switch, Route } from "react-router-dom";
import { withCookies } from "react-cookie";
import { Homepage } from "./homepage";
import { init as AccountInit } from "./account/router";
import { init as SettingInit } from "./setting/router";
import { init as CourseInit } from "./course/router";
import { ForgetPassowrd, ResetPassword, EmailValidate } from "./user/user";

import PrimarySearchAppBar from "./AppBar";

import {
  accountPath,
  coursePathPrefix,
  profilePath,
  forgetPswdPath,
  resetPswdPath,
  emailValidatePath,
} from "./utils/URLPath";

function App() {
  return (
    <div>
      <PrimarySearchAppBar />

      <Switch>
        <Route path={accountPath}>
          <AccountInit />
        </Route>
        <Route path={emailValidatePath}>
          <EmailValidate />
        </Route>
        <Route path={forgetPswdPath}>
          <ForgetPassowrd />
        </Route>
        <Route path={resetPswdPath}>
          <ResetPassword />
        </Route>
        <Route path={profilePath}>
          <SettingInit />
        </Route>
        <Route path={coursePathPrefix}>
          <CourseInit />
        </Route>

        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </div>
  );
}

export default withCookies(App);
