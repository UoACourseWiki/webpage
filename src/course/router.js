import { Switch, Route, Redirect } from "react-router-dom";
import { coursePath, subjectPath } from "../utils/URLPath";
import CoursePage from "./coursePage";
import Subject from "./subject";

function init() {
  return (
    <Switch>
      <Route path={coursePath}>
        <CoursePage />
      </Route>
      <Route path={subjectPath}>
        <Subject />
      </Route>
      <Route path="/">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export { init };
