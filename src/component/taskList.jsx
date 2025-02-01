import { getTodoAsync ,deleteTodoAsync, updateTodoAsync } from "../redux/todoslice";
import { useEffect, useState} from "react"
import { useSelector,useDispatch } from "react-redux"
import styles from "./taskList.module.css";
function TaskList(){
  const[deleteId,setDeleteId]=useState(null)
    const {data ,loading ,error,delError}=useSelector(state=>state.todos)
    const dispatch=useDispatch()
    useEffect(()=>{
      dispatch(getTodoAsync())
    },[dispatch])
    if (loading) {
      return (
        <div className={styles["loader-container"]}>
          <span className={styles.loader}></span>
        </div>
      );
    }    
    const deleteTask=(id)=>{
      setDeleteId(id)
      dispatch(deleteTodoAsync(id))
    }
    const toggleItem=(id)=>{
      dispatch(updateTodoAsync(id))
    }
  return(
    <>
      <div className={styles.container}>
        {error &&<p>{error}</p>}
        {data.length === 0 && <p>No tasks available.</p>}
        {data.map(item=>(
          <div key={item.id} className={styles['task-container']}>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleItem(item.id)}
            />
            <h1 className={item.completed ? styles ['line-through'] : ''}>{item.title}</h1>
            <button onClick={()=>deleteTask(item.id)} disabled={deleteId === item.id}>{deleteId ===item.id ? 'Deleting..' : 'Delete'}</button>
            {delError && <p>{delError}</p>}
          </div>
        ))}
      </div>
    </>
  )
}
export default TaskList