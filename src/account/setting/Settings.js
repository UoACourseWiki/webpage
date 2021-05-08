import { useState } from "react";
import { useCookies } from "react-cookie";

import SettingsPage from "../view/SettingsPage.js";
import { settingsHandler } from "./settingsHandler.js";
// import { loginPath } from "../../utils/URLPath.js";
import { axios732, HTTP_OK } from "../../utils/Macro.js";
import { SuccessBar, FailBar } from "../view/ResultBar.js";
// import TokenRefresher from "../../utils/TokenRefresher.js";

export default function Settings() {
    const [user, setUser] = useState({});
    const [cookies, , removeCookie] = useCookies(["user"]);

    // console.log(cookies.user);

    //Guard: Check if user logged in, if not redirect to Login page
    if (typeof cookies.user === 'undefined') {
        window.location.replace('/account/login')
    }

    // Refresh Token before get user info
    // TokenRefresher();
    // console.log("Get current user:" + _user)

    function updateUser(field) {
        setUser({ ...user, ...field });
    }

    const [waiting, setWaiting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const successMsg = "✅ Your settings has been saved! Please login again.";

    const [showFail, setShowFail] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = () => {
        setWaiting(true);

        settingsHandler(user, (status, errmsg) => {
            setWaiting(false);

            if (status === HTTP_OK) {
                setShowSuccess(true);
            } else {
                setShowFail(true);
                setError(errmsg);
            }
        });
    };

    function handleSuccess() {
        setShowSuccess(false);
        removeCookie("user", { path: "/" });
        window.location.reload();
    }

    function handleFailure() {
        setShowFail(false);
    }

    console.log(cookies.user.id)
    return (
        <>
            <SettingsPage
                updateInfo={updateUser}
                submit={handleSubmit}
                isWaiting={waiting}
                currentUser={cookies.user}
            />
            <SuccessBar
                open={showSuccess}
                onClick={handleSuccess}
                message={successMsg}
            />
            <FailBar open={showFail} onClick={handleFailure} message={error} />
        </>
    );


}