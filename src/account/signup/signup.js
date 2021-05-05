import { useState } from "react";
import resigter from "./registerHandler";
import SignupDialogue from "./signupDialogue";

export default function SignUp() {
  const [user, setUser] = useState({});

  function updateUser(field) {
    setUser({ ...user, ...field });
  }

  function callback(status, errmsg) {}

  const handleSubmit = () => {
    resigter(user, callback);
  };

  return SignupDialogue(updateUser, handleSubmit);
}
