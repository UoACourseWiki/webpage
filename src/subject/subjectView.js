
import styles from './subjectView.module.css';

 function handleClick(){
    
        console.log('Click happened');
      
}
export default  function SubjectView({courses, error}){  
    if (error !== undefined) {
      return <div><h1 className={styles.container}>{courses } {error.data.title}</h1> <button className={styles.button}>BACK</button></div>
    } 
 else  
      return (<div>
        <p className={styles.p}>All courses</p>
        {courses.map((c,i)=>(

         
      <button onClick={()=> handleClick()} className={styles.subject} key={i} >
        <div className={styles.title}>{c.subject} {  }
        {c.catalogNbr} </div>
        <div>{c.title}</div>
        </button>
      
      ) )}</div>  )
  }