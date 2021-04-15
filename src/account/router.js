import React from "react";
import Login from "./Login.js";

import { UserContextProvider } from "../subject/UserContext";
import { LoginContextProvider } from "../subject/LoginContext.js";

function Init() {
    return (
        <LoginContextProvider>
            <UserContextProvider>
                <Login />
            </UserContextProvider>
        </LoginContextProvider>
    )
}

export { Init as init };
