import './App.css'
import { Route, Routes } from "react-router-dom"
import Index from './Pages/Index'
import Register from './Pages/Register'
import Login from "./Pages/Login"
import ArticlelistPage from './Pages/ArticleListPage'
import Article from './components/Article/Article'

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
          <Route path="/articles" element={<ArticlelistPage />} />
          <Route path="/articles/:id" element={<Article />} />
        </Routes>
      </div>
    </>
  )
}

export default App
