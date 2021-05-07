import { Switch, Route, useHistory } from "react-router-dom";
import Login from "./Login.js";
import SignUp from "./Signup";
import { Button, makeStyles } from "@material-ui/core";

import { signupPath, loginPath } from "../utils/URLPath";

function Init() {
    const history = useHistory();

    const useStyles = makeStyles({
        container: {
            marginTop: "20%",
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
        },
        btn: {
            margin: "20px",
        },
    });

    const classes = useStyles();

    return (
        <Switch>
            <Route path={signupPath}>
                <SignUp />
            </Route>
            <Route path={loginPath}>
                        <Login />
                        {/* <LoginPage /> */}
            </Route>
            <Route path="/">
                <div className={classes.container}>
                    <Button
                        className={classes.btn}
                        onClick={() => {
                            history.push(signupPath);
                        }}
                    >
                        Sign Up
          </Button>

                    <Button
                        className={classes.btn}
                        onClick={() => {
                            history.push(loginPath);
                        }}
                    >
                        Login
          </Button>
                </div>
            </Route>
        </Switch>
    );
}

export { Init as init };
