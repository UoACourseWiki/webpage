import styles from "./subjectView.module.css";
import { useHistory } from "react-router";

export default function NotFoundPage({ errorMessage }) {
  const history = useHistory();

  return (
    <div>
      <h2 className={styles.container}>🥺 Error: {errorMessage}</h2>
      <button
        className={styles.button}
        onClick={() => {
          history.push("/");
        }}
      >
        Back to Home
      </button>
    </div>
  );
}
