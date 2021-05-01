import React from "react";
import Login from "./Login.js";

import { UserContextProvider } from "../utils/UserContext";
import { LoginContextProvider } from "../utils/LoginContext.js";

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
