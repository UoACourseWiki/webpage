import { useState } from "react";
import { resigter, HTTP_OK } from "./register";
import SignupPage from "./signupPage";
import SuccessDialogue from "./successDialogue";

export default function SignUp(props) {
  const [user, setUser] = useState({});

  function updateUser(field) {
    setUser({ ...user, ...field });
  }

  // request hand handle result
  const [openSuccessDia, setOpenSuccessDia] = useState(false);
  const [error, setError] = useState("");

  function signupCallback(status, errmsg) {
    if (status === HTTP_OK) {
      setOpenSuccessDia(true);
      return;
    }

    setError(errmsg);
  }

  const handleSubmit = () => {
    resigter(user, signupCallback);
  };

  return (
    <>
      <SignupPage
        updateInfo={updateUser}
        handleSubmit={handleSubmit}
        error={error}
      ></SignupPage>
      <SuccessDialogue
        open={openSuccessDia}
        close={() => {
          setOpenSuccessDia(false);
        }}
      />
    </>
  );
}
