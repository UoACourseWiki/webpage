import React, { createContext, useContext, useState } from "react";

import dummyLogin from "../account/dummyJSON/dummyLogin.json"

export const UserContext = createContext();

export const UserContextProvider = (props) => {

    //Set default user as dummy for testing purpose
    const [user, setUser] = useState(dummyLogin.user);

    return (
        <UserContext.Provider value = {[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}