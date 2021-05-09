import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axios732 } from "../utils/HTTPHelper";
import SubjectView from "./subjectView";

const APIPath = "/Courses";
const queryKey = "subject";

export default function Subject() {
  const [courses, setCourses] = useState([]);
  const [resError, setResError] = useState();

  function updateCourses(items) {
    setCourses([...items]);
  }

  let { subject } = useParams();
  const subjectParams = {};
  subjectParams[queryKey] = subject.toUpperCase();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios732.get(APIPath, { params: subjectParams }).then(
      (res) => {
        updateCourses(res.data);
        setIsLoading(false);
      },
      (err) => {
        const res = err.response;
        setResError(res);
        setIsLoading(false);
      }
    );
  }, []);

  return <SubjectView courses={courses} error={resError} loading={isLoading} />;
}
