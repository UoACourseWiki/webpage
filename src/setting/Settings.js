import { useState } from "react";
import { useCookies } from "react-cookie";

import SettingsPage from "./SettingsPage.js";
import { setInfo, validate } from "./settingsHandler.js";
import { loginPath } from "../utils/URLPath.js";
import { HTTP_OK } from "../utils/Macro.js";
import { SuccessBar, FailBar } from "../utils/ResultBar.js";
import TokenRefresher from "../utils/TokenRefresher.js";


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

      //Refresh Token then send request
      setWaiting(true);

      // Refresh token when submit
      //Welcome to callback hell! Have fun with async
      TokenRefresher(currentUser, (status, newUser) => {
        if (status !== HTTP_OK) {
          setWaiting(false);
          setShowFail(true);
          setError("Token Fetch Failed, please logout and try again");
          return
        }

        setInfo(user, newUser, (status, errmsg) => {
          setWaiting(false);
          if (status === HTTP_OK) {
            setShowSuccess(true);
          } else {
            setShowFail(true);
            setError(errmsg);
          }
        })
      })

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
