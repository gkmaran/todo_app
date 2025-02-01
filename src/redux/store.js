import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authslice'
import todoreducer from './todoslice'
const store=configureStore({
    reducer:{
        auth:authReducer,
        todos:todoreducer
    }
})

export default store