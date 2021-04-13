import React from "react";
import Login from "./Login.js";

import { UserContextProvider, UserContext } from "../subject/UserContext";

function Init() {
    return <UserContextProvider>
        <Login />
    </UserContextProvider>;
}

export { Init as init };
