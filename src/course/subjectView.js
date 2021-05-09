import styles from "./subjectView.module.css";
import { useHistory } from "react-router";
import { coursePathPrefix } from "../utils/URLPath";
import NotFoundPage from "../utils/views/NotFoundPage";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function SubjectView({ courses, error, loading }) {
  const history = useHistory();

  if (!loading) {
    if (error !== undefined) {
      return <NotFoundPage errorMessage={error.data.title} />;
    }

    if (!courses === undefined || courses.length === 0) {
      const errmsg = "No Courses Found";
      return <NotFoundPage errorMessage={errmsg} />;
    }
  }

  // show course items
  function handleClick(c) {
    const urlPath = coursePathPrefix + "/" + c.subject + "/" + c.catalogNbr;
    history.push(urlPath);
  }

  return (
    <div>
      <p className={styles.p}>All courses</p>
      <CircularProgress
        style={{ display: !loading ? "none" : "block", margin: "20px auto" }}
      />
      {loading
        ? ""
        : courses.map((c, i) => (
            <button
              onClick={() => handleClick(c)}
              className={styles.subject}
              key={i}
            >
              <div className={styles.title}>
                {c.subject} {}
                {c.catalogNbr}{" "}
              </div>
              <div>{c.title}</div>
            </button>
          ))}
    </div>
  );
}
