import { Switch, Route } from "react-router-dom";
import { Homepage } from "./homepage";
import { init as AccountInit } from "./account/router";
import { init as CommentInit } from "./comment/router";
import { init as SettingInit } from "./setting/router";
import { init as CourseInit } from "./course/router";
import Subject from "./subject/subject";
import PrimarySearchAppBar from "./AppBar";

function App() {
  return (
    <div>
      <PrimarySearchAppBar />

      <Switch>
        <Route path="/account">
          <AccountInit />
        </Route>
        <Route path="/comment">
          <CommentInit />
        </Route>
        <Route path="/setting">
          <SettingInit />
        </Route>
        <Route path="/course">
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

export default App;
