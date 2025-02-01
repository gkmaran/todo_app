import { Link } from "react-router-dom"
import { logout } from "../redux/authslice"
import { useSelector ,useDispatch } from "react-redux"
import styles from './landing.module.css';
import todoimg from '../assets/todo.png';
import todosample from '../assets/todoc.png';
function Landing(){
    const dispatch=useDispatch()
    const logoutaccount=()=>{
        dispatch(logout())
    }
    const {loggedIn}=useSelector(state=>state.auth)
    return(
        <>
            {!loggedIn && (
            <nav className={styles.navbar}>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </nav>
      )}
            {loggedIn && (
            <nav className={styles.navbar}>
                <Link to="/todos">Todos</Link>
                <Link className={styles["logout-link"]} onClick={logoutaccount}>
                Logout
                </Link>
            </nav>
        )}
        <div className={styles.content}>
            <div className={styles.img1}>
                <img src={todoimg} alt="todo"/>
            </div>
            <div className={styles.description}>
                    <p>Todo apps help you organize your daily tasks efficiently. With our app, you can:</p>
                    <ul>
                        <li>Create, edit, and delete tasks</li>
                        <li>Set priorities and deadlines</li>
                        <li>Track your progress daily</li>
                        <li>Stay productive and organized!</li>
                    </ul>
                    <p><strong>Start creating your tasks now!</strong></p>
                </div>
            <div className={styles.img1}>
                <img src={todosample} alt="todo"/>
            </div>
        </div>
            
        </>
    )
}
export default Landing