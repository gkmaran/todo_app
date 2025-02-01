import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const createTodoAsync=createAsyncThunk('todo/createTodo' ,async(todoData,{rejectWithValue})=>{
    try {
        const response=await fetch("https://todo-learnz-development-hubs-projects.vercel.app/todos",{
            method:'POST',
            headers:{
                
                Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMjciLCJleHAiOjE3NDAxMTA0Mzl9.cDX_G-AS-ZX5QXNAzGsZFrfc0fOJe44nbrXMoUSySTQ ',
                'Content-Type': 'application/json',          
            },
            body:JSON.stringify(todoData)
        })
        if(!response.ok){
            throw new Error('Todo Not Created'); 
        }
        return await response.json()
        }
        catch(error){
            return rejectWithValue(error.message)
        }
})
export const getTodoAsync=createAsyncThunk('todos/gettodo' , async(_,{rejectWithValue})=>{
    try{
    const response= await fetch('https://todo-learnz-development-hubs-projects.vercel.app/todos',{
        method:'GET',
        headers:{
            Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMjciLCJleHAiOjE3NDAxMTA0Mzl9.cDX_G-AS-ZX5QXNAzGsZFrfc0fOJe44nbrXMoUSySTQ',
            'Content-Type': 'application/json'
        },
    })
    if(!response.ok){
        throw new Error('Fetching is not created correctly'); 
    }
    return await response.json()
    }
    catch(error){
        return rejectWithValue(error.message)
    }
})
export const deleteTodoAsync=createAsyncThunk('todos/deltodo' ,async(id ,{rejectWithValue})=>{
    try {
        const response=await fetch(`https://todo-learnz-development-hubs-projects.vercel.app/todos/${id}`,{
            method:'DELETE',
            headers:{
                Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMjciLCJleHAiOjE3NDAxMTA0Mzl9.cDX_G-AS-ZX5QXNAzGsZFrfc0fOJe44nbrXMoUSySTQ',
                'Content-Type': 'application/json'
            }
        })
        if(!response.ok){
            throw new Error("fetch delete is not working properly")
        }
        return id ;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
export const updateTodoAsync=createAsyncThunk('todos/updatetodo' ,async(id ,{rejectWithValue})=>{
    try {
        const response=await fetch(`https://todo-learnz-development-hubs-projects.vercel.app/todos/${id}/complete?completed=true`,{
            method:'PUT',
            headers:{
                Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMjciLCJleHAiOjE3NDAxMTA0Mzl9.cDX_G-AS-ZX5QXNAzGsZFrfc0fOJe44nbrXMoUSySTQ',
                'Content-Type': 'application/json'
            }
        })
        if(!response.ok){
            throw new Error("update is not working properly")
        }
        return id ;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
const todoSlice=createSlice({
    name:'todos',
    initialState:{
        data:[],
        error:null,
        loading:false,
        createLoading:false,
        createError:null,
        delError:null,
        delLoading:false,
        updateLoading:false,
        updateError:null
    },
    extraReducers:(builder)=>{
        builder
            .addCase(createTodoAsync.pending,(state)=>{
                state.createLoading=true
                state.createError=null
            })
            .addCase(createTodoAsync.fulfilled,(state,action)=>{
                state.createLoading=false
                state.data.unshift(action.payload)
            })
            .addCase(createTodoAsync.rejected,(state,action)=>{
                state.createLoading=false
                state.createError=(action.payload)
            })
            .addCase(getTodoAsync.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(getTodoAsync.fulfilled,(state,action)=>{
                state.loading=false
                state.data=action.payload
            })
            .addCase(getTodoAsync.rejected,(state,action)=>{
                state.loading=false
                state.error=(action.payload)
            })
            .addCase(deleteTodoAsync.pending,(state)=>{
                state.delLoading=true
                state.delError=null
            })
            .addCase(deleteTodoAsync.fulfilled,(state,action)=>{
                state.delLoading=false
                state.data=state.data.filter(item =>item.id !==action.payload)
            })
            .addCase(deleteTodoAsync.rejected,(state,action)=>{
                state.delLoading=false
                state.delError=(action.payload)
            })
            .addCase(updateTodoAsync.pending,(state)=>{
                state.updateLoading=true
                state.updateError=null
            })
            .addCase(updateTodoAsync.fulfilled,(state,action)=>{
                state.updateLoading=false
                state.data=state.data.map(item =>item.id === action.payload ?  {...item,completed:!item.completed} : item )
            })
            .addCase(updateTodoAsync.rejected,(state,action)=>{
                state.updateLoading=false
                state.updateError=(action.payload)
            })
}
})
export default todoSlice.reducer