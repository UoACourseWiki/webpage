import { useState,useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { axios732 } from '../utils/Macro';
import styles from './subject.module.css';

const URLPath = "/Courses";
const queryKey = "subject";


export default  function Subject () {

    const [courses, setCourses] = useState([])
    function updateCourses (items){
      setCourses([...items]);
    }

    let {subject} = useParams();
    const subjectParams = {};
    subjectParams[queryKey] = subject.toUpperCase();

    useEffect(() => { 
     axios732.get(URLPath, { params: subjectParams }).then(
        (res) => {
          updateCourses(res.data)
        },
        (err) => {}
   
      )}, []);

    return <SubjectView  courses={courses} />
}
function SubjectView({courses}){
    return (<div>
      <p className={styles.p}>All courses</p>
      {courses.map((c,i)=>(
    <button className={styles.subject} key={i} >
      <div className={styles.title}>{c.subject} {  }
      {c.catalogNbr} </div>
      <div>{c.title}</div>
      </button>
    
    ) )}</div>  )
}