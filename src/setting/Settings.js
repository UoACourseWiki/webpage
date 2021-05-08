import { useState } from "react";
import { useCookies } from "react-cookie";

import SettingsPage from "./SettingsPage.js";
import { setInfo, validate } from "./settingsHandler.js";
import { loginPath } from "../utils/URLPath.js";
import { HTTP_OK } from "../utils/Macro.js";
import { SuccessBar, FailBar } from "../utils/ResultBar.js";

export default function Settings() {
  const [cookies, , removeCookie] = useCookies(["user"]);
  const currentUser = cookies.user;

  //Guard: Check if user logged in, if not redirect to Login page
  if (currentUser === undefined) {
    window.location.replace(loginPath);
  }

  const [user, setUser] = useState({
    em: currentUser.email,
    nm: currentUser.nickName,
    opd: "",
  });

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
    validate(user, (valid, errmsg) => {
      if (!valid) {
        setError(errmsg);
        setShowFail(true);
        return;
      }

      console.log(user);
      //send request
      setWaiting(true);

      setInfo(user, (status, errmsg) => {
        setWaiting(false);

        if (status === HTTP_OK) {
          setShowSuccess(true);
        } else {
          setShowFail(true);
          setError(errmsg);
        }
      });
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

  return (
    <>
      <SettingsPage
        updateInfo={updateUser}
        submit={handleSubmit}
        isWaiting={waiting}
        currentUser={currentUser}
      />
      <SuccessBar
        open={showSuccess}
        clickClose={handleSuccess}
        message={successMsg}
      />
      <FailBar open={showFail} clickClose={handleFailure} message={error} />
    </>
  );
}
