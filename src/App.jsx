import './App.css'
import Register from './pages/register'
import Landing from './pages/Landing'
import Login from './pages/login'
import TaskForm from './component/taskForm'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {
  return(
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/todos' element={<TaskForm/>}/>
        </Routes>
      </BrowserRouter>
  )
}
export default App
