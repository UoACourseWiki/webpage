import styles from "./homepage.module.css";
import axios from "axios";
import { useState } from "react";
import SearchPage from "./search/searchPage";

function Homepage() {
  return (
    <div>
      <div className={styles.search}>
        <SearchPage />
      </div>

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
