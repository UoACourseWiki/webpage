import ResetPasswordPage from "./view/ResetPasswordPage";
import { useState } from "react";
import { SuccessBar, FailBar } from "../utils/ResultBar";
import { useHistory } from "react-router-dom";
import { loginPath } from "../utils/URLPath";
import { axios732, errorMessage } from "../utils/HTTPHelper";

const APIPath = "/Users/reset-password";
const bodyKeys = {
  tk: "token",
  em: "email",
  pd: "password",
  cpd: "confirmPassword",
};

export default function ResetPassowrd() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const email = params.get("email");
  const [user, setUser] = useState({ em: email });

  function updateUser(field) {
    setUser({ ...user, ...field });
  }

  // HTTP request
  const [waiting, setWaiting] = useState(false);
  const [showSuccessBar, setShowSuccessBar] = useState(false);
  const successMsg = "🤗 Reset Successfully, need login again~";
  const [showFailBar, setShowFailBar] = useState(false);
  const [failMsg, setFailMsg] = useState("");

  const handleSubmit = () => {
    // send request
    var body = {
      [bodyKeys.em]: user.em,
      [bodyKeys.pd]: user.pd,
      [bodyKeys.cpd]: user.cpd,
      [bodyKeys.tk]: token,
    };

    setWaiting(true);
    axios732.post(APIPath, body).then(
      () => {
        setWaiting(false);
        setShowSuccessBar(true);
      },
      (err) => {
        setWaiting(false);

        const errmsg = errorMessage(err);
        setFailMsg(errmsg);
        setShowFailBar(true);
      }
    );
  };

  // show result
  const history = useHistory();
  function handleSuccessBar() {
    setShowSuccessBar(false);
    // need login again
    history.push(loginPath);
  }

  function handleFailureBar() {
    setShowFailBar(false);
  }

  return (
    <>
      <ResetPasswordPage
        initEmail={email}
        updateInfo={updateUser}
        submit={handleSubmit}
        isWaiting={waiting}
      />{" "}
      <SuccessBar
        open={showSuccessBar}
        clickClose={handleSuccessBar}
        message={successMsg}
      />
      <FailBar
        open={showFailBar}
        clickClose={handleFailureBar}
        message={failMsg}
      />
    </>
  );
}
