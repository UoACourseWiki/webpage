import { useState } from "react";
import { resigter, HTTP_OK } from "./register";
import SignupPage from "./view/SignupPage";
import { SuccessBar, FailBar } from "../utils/views/ResultBar";
import { loginPath } from "../utils/URLPath";
import { useHistory } from "react-router-dom";

export default function SignUp(props) {
  const [user, setUser] = useState({});

  function updateUser(field) {
    setUser({ ...user, ...field });
  }

  // request and handle result
  const [waiting, setWaiting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const successMsg = "🤗 Check your email to verify your account now!";

  const [showFail, setShowFail] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setWaiting(true);

    resigter(user, (status, errmsg) => {
      setWaiting(false);

      if (status === HTTP_OK) {
        setShowSuccess(true);
      } else {
        setShowFail(true);
        setError(errmsg);
      }
    });
  };

  const history = useHistory();
  function handleSuccess() {
    setShowSuccess(false);
    history.push(loginPath);
  }

  function handleFailure() {
    setShowFail(false);
  }

  return (
    <>
      <SignupPage
        updateInfo={updateUser}
        submit={handleSubmit}
        isWaiting={waiting}
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
