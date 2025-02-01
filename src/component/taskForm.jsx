import { createTodoAsync  } from "../redux/todoslice"
import { useForm } from "react-hook-form"
import { useSelector,useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import TaskList from './taskList'
import styles from './taskForm.module.css' 
function TaskForm(){
    const dispatch=useDispatch()
    const {createLoading ,createError}=useSelector((state)=>state.todos)
    const{handleSubmit,register,formState:{errors},reset}=useForm()
    const onsubmit=(data)=>{
        dispatch(createTodoAsync(data))
        reset()
    }
    return(
        <>
            <Link to={'/'} className={styles.link}><i className="fa-solid fa-house"></i></Link>
            <h2 className={styles.head}>Create Your To-Do List</h2>
            <form className={styles["form-container"]} onSubmit={handleSubmit(onsubmit)}>
                <input {...register("title", { required: "Input Is Empty" })} type="text" />
                <button className={styles["form-button"]} type="submit" disabled={createLoading}>
                {createLoading ? "Adding.." : "Add"}
                </button>
                {errors.title && <p>{errors.title.message}</p>}
            </form>
            {createError && <p>{createError}</p>}
            <TaskList/>
        </>
    )
}
export default TaskForm