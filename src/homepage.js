import styles from "./homepage.module.css";
import LoginButton from "./module/LoginButton";

function Homepage() {
  return (
    <div className={styles.App}>
      <LoginButton />
    </div>
  );
}


export { Homepage };