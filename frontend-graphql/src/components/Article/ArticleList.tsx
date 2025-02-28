import { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { gql, useQuery } from "@apollo/client";
import { ArticleInterface } from '../../Interfaces/Interfaces';
import { FaHeart } from 'react-icons/fa'; 
import '../../styles/articles-list.css';
import {DeleteArticleButton} from './deleteArticle';
import Button from '@mui/material/Button';
import { graphql } from '../../gql/gql';

const GET_ARTICLES_QUERY = graphql(`
    query GetAllArticles {
      getAllArticles {
        author {
          id
          email
          username
          bio
        }
        authorId
        content
        id
        published
        title
        like {
          userId
          id
          createdAt
          articleId
        }
      }
    }
`);

const ArticlesList = () => {
    const navigate = useNavigate();
    
  const { loading, error, data, refetch } = useQuery(GET_ARTICLES_QUERY);
    
    if (loading) return <p>Loading articles...</p>;
    if (error) return <p>Error loading articles: {error.message}</p>;
    
    return (
      <div className="articles-container">
        <Button variant="contained" onClick={() => navigate("/create-article")}>
          Créer un article
        </Button>
        <h1>Timeline</h1>
        <div className="articles-list">
          {data?.getAllArticles.map((article: ArticleInterface) => (
            <div key={article.id} className="article-card">
              <h3 className="article-title">{article.title}</h3>
              <p className="article-content">{article.content.substring(0, 100)}...</p>
              <p className="article-author">@{article.author.username}</p>
              <div className="article-footer">
                <span className="article-likes">
                  <FaHeart /> {article.like?.length}
                </span>
                <Link to={`/articles/${article.id}`} className="more-details-link">
                  More Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default ArticlesList;