import { authReset, loginAysnc } from "../redux/authslice"
import { useDispatch,useSelector } from "react-redux"
import { useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import styles from './login.module.css';
function Login(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const{loginLoading,loginError,loginStatus}=useSelector((state)=>state.auth)
    const{register,handleSubmit,formState:{errors},reset}=useForm()
    const onSubmit=(data)=>{
        dispatch(loginAysnc(data))
    }
    useEffect(()=>{
        if(loginStatus==='success'){
            navigate('/todos')
            reset()
            dispatch(authReset())
        }
    },[loginStatus])
    return(
        <>  
            <div className={styles.container}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="username">Email:</label>
                    <input
                    {...register("username", { required: "Email is Empty" })}
                    placeholder="Email"
                    />
                    {errors.username && <p>{errors.username.message}</p>}

                    <label htmlFor="password">Password:</label>
                    <input
                    type="password"
                    {...register("password", { required: "Password is Empty" })}
                    placeholder="Password"
                    />
                    {errors.password && <p>{errors.password.message}</p>}

                    <button type="submit" disabled={loginLoading}>
                    {loginLoading ? "Logging.." : "Login"}
                    </button>
                </form>
                {loginError && <p>{loginError}</p>}
            </div>
        </>
    )
}
export default Login