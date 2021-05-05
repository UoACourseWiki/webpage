import { useState } from "react";
import { resigter, HTTP_OK } from "./registerHandler";
import SignupDialogue from "./signupDialogue";

export default function SignUp() {
  const [user, setUser] = useState({});

  function updateUser(field) {
    setUser({ ...user, ...field });
  }

  function signupCallback(status, errmsg) {
    if (status === HTTP_OK) {
      // successfully
    }
  }

  const handleSubmit = () => {
    resigter(user, signupCallback);
  };

  return SignupDialogue(updateUser, handleSubmit);
}
