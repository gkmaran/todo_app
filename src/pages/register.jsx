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
                                        <label htmlFor="">Email:</label><br/>
                                        <input {...register('email',{required :'Email is Empty'})} placeholder="Email" />
                                        {errors.email && <p>{errors.email.message}</p>}<br/><br/>
                                        <label htmlFor="">Pasword:</label><br/>
                                        <input type="password" {...register('password',{required :'password is Empty'})} placeholder="Password" />
                                        {errors.password && <p>{errors.password.message}</p>}<br/>
                                        <button type="submit" disabled={registrationLoading}>{registrationLoading ? "Registering.." : "Register"}</button>
                                        <h4>Already have a account ? <span><Link to='/login'>Login</Link></span></h4>
                                </form>
                        </div>
                        {registrationError && <p>{registrationError}</p>}
                </>
        )
}
export default Register