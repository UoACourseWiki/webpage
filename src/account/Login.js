import LoginPage from "./view/LoginPage";
import { useState } from "react";
import { SuccessBar, FailBar } from "./view/ResultBar";
import { useHistory } from "react-router-dom";
import { axios732 } from "../utils/Macro";
import { useCookies } from "react-cookie";

const APIURL = "/Users/authenticate";
const bodyKeys = {
  em: "email",
  pd: "password",
};

export default function Login() {
  const [user, setUser] = useState({});

  function updateUser(field) {
    setUser({ ...user, ...field });
  }

  const [, setCookie] = useCookies("user");

  // HTTP request
  const [waiting, setWaiting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const successMsg = "🤗 Successfully!";

  const [showFail, setShowFail] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    var body = {
      [bodyKeys.em]: user.em,
      [bodyKeys.pd]: user.pd,
    };
    setWaiting(true);

    axios732.post(APIURL, body).then(
      (res) => {
        setWaiting(false);
        setShowSuccess(true);

        setCookie("user", res.data, { path: "/" });
      },
      (err) => {
        setWaiting(false);

        const res = err.response;
        const errmsg = res.data.message;
        setError(errmsg);
        setShowFail(true);
      }
    );
  };

  const history = useHistory();
  function handleSuccessBar() {
    setShowSuccess(false);
    history.push("/");
  }

  function handleFailureBar() {
    setShowFail(false);
  }

  return (
    <>
      <LoginPage
        updateInfo={updateUser}
        submit={handleSubmit}
        isWaiting={waiting}
      />
      <SuccessBar
        open={showSuccess}
        clickClose={handleSuccessBar}
        message={successMsg}
      />
      <FailBar open={showFail} clickClose={handleFailureBar} message={error} />
    </>
  );
}
