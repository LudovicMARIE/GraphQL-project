import './App.css'
import { Route, Routes } from "react-router-dom"
import Index from './Pages/Index'
import Register from './Pages/Register'
import Login from "./Pages/Login"
import CreateArticle from "./Pages/createArticle"

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
          <Route path="/create-article" element={<CreateArticle />} />
        </Routes>
      </div>
    </>
  )
}

export default App
