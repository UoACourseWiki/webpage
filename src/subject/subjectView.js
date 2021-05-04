
import styles from './subjectView.module.css';


export default  function SubjectView({courses, error}){  
    if (error !== undefined) {
      return <p>{error.status}:{error.data.title} </p>
    } 
  
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