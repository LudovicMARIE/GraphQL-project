import './App.css'
import PrivateRoute from './utils/Route/PrivateRoute';
import { Route, Routes } from 'react-router-dom'
import Index from './Pages/Index'
import Register from './Pages/Register'
import Login from "./Pages/Login"

function App() {

  return (
    <>
      <div>
        {/* <div className="row">
          <Header />
        </div> */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  )
}

export default App
