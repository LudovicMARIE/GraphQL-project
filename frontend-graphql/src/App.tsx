import './App.css'
import PrivateRoute from './utils/Route/PrivateRoute';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Index from './Pages/Index'
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import Register from './Pages/Register'
import Login from "./Pages/Login"
import ArticlelistPage from './Pages/ArticleListPage'
import Article from './components/Article/Article'
import CreateArticle from "./Pages/createArticle"


function App() {
  const { getUserInfos, logout } = useContext(UserContext);
  const user = getUserInfos();

  return (
    <>
    <nav>
        <Link to="/">Accueil</Link>
        {!user ? (
          <Link to="/login">Connexion</Link>
        ) : (
          <button onClick={logout}>Déconnexion</button>
        )}
      </nav>
      <div>
        {/* <div className="row">
          <Header />
        </div> */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/articles" element={<ArticlelistPage />} />
          <Route path="/articles/:id" element={<Article  />} />
          <Route path="/create-article" element={<PrivateRoute><CreateArticle/></PrivateRoute>} />
        </Routes>
      </div>
    </>
  )
}

export default App
