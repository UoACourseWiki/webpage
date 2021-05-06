

import styles from './subjectView.module.css';
import { useHistory } from 'react-router';


const courseURLPathPrefix = "/course"
export default  function SubjectView({courses, error}){  
  const history = useHistory();



 function handleClick(c){
   const urlPath = courseURLPathPrefix + "/" +c.subject+"/"+c.catalogNbr;
   history.push(urlPath)
}

    if (error !== undefined) {
      return <div><h1 className={styles.container}>{courses } {error.data.title}</h1>
       <button className={styles.button} onClick={()=>{
                 history.push("/");
       }}>BACK</button>
       </div>
    } 
 else  
      return (<div>
        <p className={styles.p}>All courses</p>
        {courses.map((c,i)=>(

         
      <button onClick={()=> handleClick(c)} className={styles.subject} key={i} >
        <div className={styles.title}>{c.subject} {  }
        {c.catalogNbr} </div>
        <div>{c.title}</div>
        </button>
      
      ) )}</div>  )
  }