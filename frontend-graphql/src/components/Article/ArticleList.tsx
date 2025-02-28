import { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { gql, useQuery } from "@apollo/client";
import { ArticleInterface } from '../../Interfaces/Interfaces';
import Article from './Article';
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
        <h1>Articles</h1>
        <Button variant="contained" onClick={() => navigate("/create-article")}>
          Créer un article
        </Button>
        <div className="articles-list">
          {/* {data.getAllArticles.map((article: ArticleInterface) => (
            <Article 
              key={article.id}
              id={article.id}
            />
          ))} */}
            <div className="articles-list">
              {data?.getAllArticles.map((article:ArticleInterface) => (
                <div key={article.id} className="article-card">
                  <h3>{article.title}</h3>
                  <p>{article.content.substring(0, 100)}...</p>
                  <p>Author: {article.author.username}</p>
                  <p>Likes: {article.like?.length ?? 0}</p>
                  <Link to={`/articles/${article.id}`}>
                    <button>More Details</button>
                  </Link>
                  {article.id}
                  <DeleteArticleButton articleId={article.id} refetch={refetch} />
                </div>
              ))}
            </div>


        </div>
      </div>
      
    );
  };

export default ArticlesList;