import { Link } from "react-router-dom"
import { logout } from "../redux/authslice"
import { useSelector ,useDispatch } from "react-redux"
import styles from './landing.module.css';
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
            <h1>Create Account And Make Your Daily Plan</h1>
        </div>
            
        </>
    )
}
export default Landing