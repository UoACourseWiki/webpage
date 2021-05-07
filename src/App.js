import { Switch, Route } from "react-router-dom";
import { withCookies } from "react-cookie";
import { Homepage } from "./homepage";
import { init as AccountInit } from "./account/router";
import { init as SettingInit } from "./setting/router";
import { init as CourseInit } from "./course/router";
import Subject from "./subject/subject";
import PrimarySearchAppBar from "./AppBar";
import { accountPath, coursePath, profilePath } from "./utils/URLPath";

function App() {
  return (
    <div>
      <PrimarySearchAppBar />

      <Switch>
        <Route path={accountPath}>
          <AccountInit />
        </Route>
        <Route path={profilePath}>
          <SettingInit />
        </Route>
        <Route path={coursePath}>
          <CourseInit />
        </Route>

        <Route path="/subject/:subject">
          <Subject />
        </Route>

        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </div>
  );
}

export default withCookies(App);
