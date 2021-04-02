import styles from "./homepage.module.css";
import LoginButton from "./account/LoginButton";
import axios from "axios";
import { useState } from "react";

function Homepage() {
  return (
    <div className={styles.App}>
      <LoginButton />

      <div>
        <ShowVersion />
      </div>
    </div>
  );
}

function ShowVersion() {
  const [ver, setVer] = useState("");
  axios.get("/info/version").then((res) => setVer(res.data));

  if (ver.length > 0) {
    return <p className={styles.version}>@ ver: {ver}</p>;
  } else {
    return <p></p>;
  }
}

export { Homepage };
