import LoginPage from "./view/LoginPage";
import { useState } from "react";
import { SuccessBar, FailBar } from "../utils/views/ResultBar";
import { useHistory, useLocation } from "react-router-dom";
import { axios732, errorMessage } from "../utils/HTTPHelper";
import { useCookies } from "react-cookie";
import { validEmail } from "../utils/validator";
import { loginRedirectQueryKey } from "../utils/URLPath";

const APIURL = "/Users/authenticate";
const bodyKeys = {
  em: "email",
  pd: "password",
};

export default function Login() {
  const [user, setUser] = useState({ em: "", pd: "" });

  function updateUser(field) {
    setUser({ ...user, ...field });
  }

  const [, setCookie] = useCookies("user");

  // HTTP request
  const [waiting, setWaiting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const successMsg = "🤗 Login Successfully!";

  const [showFail, setShowFail] = useState(false);
  const [failMsg, setFailMsg] = useState("");

  function validate() {
    var valid = true;
    if (((valid = validEmail(user.em)), !valid)) {
      setFailMsg("Email not valid!");
      setShowFail(true);
    } else if (((valid = user.pd.length !== 0), !valid)) {
      setFailMsg("Input your password!");
      setShowFail(true);
    }

    return valid;
  }

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    // send request
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

        setFailMsg(errorMessage(err));
        setShowFail(true);
      }
    );
  };

  // redirect to URL when successfully login
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirURL = params.get(loginRedirectQueryKey);

  const history = useHistory();
  function handleSuccessBar() {
    setShowSuccess(false);
    if (redirURL) {
      history.push(redirURL);
    } else {
      history.push("/");
    }
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
      <FailBar
        open={showFail}
        clickClose={handleFailureBar}
        message={failMsg}
      />
    </>
  );
}
