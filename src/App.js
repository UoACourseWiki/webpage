import { Switch, Route } from "react-router-dom";
import { Homepage } from "./homepage";
import { InitRouters } from "./Routers";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>

      <InitRouters />
    </div>
  );
}

export default App;
