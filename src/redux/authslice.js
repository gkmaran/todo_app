import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const registerAysnc=createAsyncThunk('auth/register' ,async(regData ,{rejectWithValue})=>{
    try {
        const response=await fetch('https://todo-learnz-development-hubs-projects.vercel.app/register',{
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(regData)
        })
        if(!response.ok){
            throw new Error("Fetch Failed"); 
        }
        return await response.json(); 
    } catch (error) {
       return rejectWithValue(error.message); 
    }
})
export const loginAysnc=createAsyncThunk('auth/login' ,async(loginData ,{rejectWithValue})=>{
    try {
        const response=await fetch('https://todo-learnz-development-hubs-projects.vercel.app/login',{
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(loginData)
        })
        if(!response.ok){
            throw new Error("login Failed"); 
        }
        return await response.json();
    } catch (error) {
       return rejectWithValue(error.message); 
    }
})
   
    const authslice=createSlice({
        name:'auth',
        initialState:{
            data:{},
            registrationError:null,
            registrationLoading:false,
            registrationStatus:'idle',
            loginData:{access_token :localStorage.getItem('accessToken') || ''},
            loggedIn:localStorage.getItem('loggedIn')=='true' ? true :false ,
            loginError:null,
            loginLoading:false,
            loginStatus:'idle'
        },
        reducers:{
            authReset:(state)=>{
            state.registrationError=null
            state.registrationLoading=false
            state.registrationStatus='idle'
            state.loginError=null
            state.loginLoading=false
            state.loginStatus='idle'
            },
            logout:(state)=>{
                state.loginData={}
                state.loggedIn=false
                localStorage.clear()
            }
        },
        extraReducers:(builder)=>{
            builder
            .addCase(registerAysnc.pending,(state)=>{
                state.registrationLoading=true
                state.registrationError=null
                state.registrationStatus='pending'
            })
            .addCase(registerAysnc.fulfilled ,(state ,action)=>{
                state.registrationLoading=false;
                state.data=action.payload;
                state.registrationStatus='success'
            })
            .addCase(registerAysnc.rejected,(state ,action)=>{
                state.registrationLoading=false
                state.registrationError=action.payload;
                state.registrationStatus='rejected'
            })
            .addCase(loginAysnc.pending ,(state)=>{
                state.loginLoading=true
                state.loginError=null
                state.loginStatus='pending'
            })
            .addCase(loginAysnc.fulfilled ,(state ,action)=>{
                state.loginLoading=false
                state.loginError=null
                state.loginData=action.payload
                state.loginStatus='success'
                state.loggedIn=true
                localStorage.setItem('accessToken', action.payload.access_token);
                localStorage.setItem('loggedIn' ,'true')
            })
            .addCase(loginAysnc.rejected,(state,action)=>{
                state.loginLoading=false
                state.loginError=action.payload
                state.loginStatus='pending'
            })
        }
    })
    export const {authReset ,logout}=authslice.actions
    export default authslice.reducer