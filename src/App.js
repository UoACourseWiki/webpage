import { Switch, Route } from "react-router-dom";
import { Homepage } from "./homepage";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
