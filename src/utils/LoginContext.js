import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginContextProvider = (props) => {

    const [LoginStatus, setLoginStatus] = useState(false);

    return (
        <LoginContext.Provider value = {[LoginStatus, setLoginStatus]}>
            {props.children}
        </LoginContext.Provider>
    )
}