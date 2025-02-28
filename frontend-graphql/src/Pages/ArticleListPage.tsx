import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import ArticleList from '../components/Article/ArticleList';

function ArticlelistPage() {
  const navigate = useNavigate()

  return (
    <div className="container d-flex justify-content-center align-items-center p-4">
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex flex-row gap-3 justify-content-center">
            <ArticleList/>
        </div>
      </div>
    </div>
  )
}

export default ArticlelistPage