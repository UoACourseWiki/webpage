import ForgetPasswordPage from "./view/ForgetPasswordPage";
import { useState } from "react";
import { SuccessBar, FailBar } from "../utils/views/ResultBar";
import { useHistory } from "react-router-dom";
import { axios732 } from "../utils/HTTPHelper";
import { validEmail } from "../utils/validator";

const APIURL = "/Users/forgot-password";

export default function ForgetPassowrd() {
  const [user, setUser] = useState({});

  function updateUser(field) {
    setUser({ ...user, ...field });
  }

  // HTTP request
  const [waiting, setWaiting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const successMsg = "🤗 Check your mailbox ~";
  const [failMsg, setFailMsg] = useState("");

  const [showFail, setShowFail] = useState(false);

  const handleSubmit = () => {
    if (!validEmail(user.em)) {
      setFailMsg("Email not valid!");
      setShowFail(true);
      return;
    }

    setWaiting(true);

    axios732.post(APIURL, { email: user.em }).then(
      (res) => {
        setWaiting(false);
        setShowSuccess(true);
      },
      (err) => {
        setWaiting(false);
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
      <ForgetPasswordPage
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
