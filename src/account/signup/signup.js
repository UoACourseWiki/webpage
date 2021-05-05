import { useState } from "react";
import { resigter, HTTP_OK } from "./register";
import SignupDialogue from "./signupDialogue";
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

  // sign up dialogue
  const handleSubmit = () => {
    resigter(user, signupCallback);
  };

  return (
    <>
      <SignupDialogue
        updateInfo={updateUser}
        handleSubmit={handleSubmit}
        error={error}
      ></SignupDialogue>
      <SuccessDialogue
        open={openSuccessDia}
        handleClose={() => {
          props.onClose();
          setOpenSuccessDia(false);
        }}
      />
    </>
  );
}
