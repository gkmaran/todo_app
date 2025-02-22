import { registerAysnc,authReset} from "../redux/authslice"
import { useState,useEffect} from "react"
import { useDispatch,useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import styles from './register.module.css'

function Register(){
        const{register,handleSubmit,formState:{errors},reset}=useForm()
        const dispatch=useDispatch()
        const navigate=useNavigate()
        const{registrationLoading,registrationError,registrationStatus}=useSelector((state)=>state.auth)
        const onSubmit=(data)=>{
                dispatch(registerAysnc(data))
        }
        useEffect(()=>{
                if(registrationStatus==='success'){
                        navigate('/login')
                        reset()
                        dispatch(authReset())
                        alert('Sign Up Succesfull')
                }
        },[registrationStatus])
        return (
                <>      <Link to={'/'} className={styles.link}><i className="fa-solid fa-house"></i></Link>  
                        <h1 className={styles.heading}>Create Account</h1>
                        <div className={styles.container}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                                <label htmlFor="email">Email:</label><br />
                                <input 
                                        {...register('email', { 
                                        required: 'Email is required', 
                                        pattern: { 
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 
                                                message: 'Invalid email format' 
                                        } 
                                        })} 
                                        placeholder="Email" 
                                />
                                {errors.email && <p>{errors.email.message}</p>}<br /><br />
                                <label htmlFor="password">Password:</label><br />
                                <input 
                                        type="password" 
                                        {...register('password', { 
                                        required: 'Password is required', 
                                        minLength: { value: 8, message: 'Password must be at least 8 characters long' }, 
                                        pattern: { 
                                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 
                                                message: 'Password must be at least 8 characters long and contain at least one letter and one number' 
                                        } 
                                        })} 
                                        placeholder="Password" 
                                />
                                {errors.password && <p>{errors.password.message}</p>}<br />
                                <button type="submit" disabled={registrationLoading}>
                                        {registrationLoading ? "Registering.." : "Register"}
                                </button>
                                <h4>Already have an account? <span><Link to='/login'>Login</Link></span></h4>
                        </form>
                        </div>
                        {registrationError && <p>{registrationError}</p>}
                </>
        )
}
export default Register