import React, { useState } from 'react';
import { gql, useMutation, useQuery } from "@apollo/client";
import { ArticleData, ArticleInterface, CommentInterface } from '../../Interfaces/Interfaces';
import { useParams } from 'react-router-dom';
import { graphql } from '../../gql/gql';
import { FaHeart } from 'react-icons/fa';
import '../../styles/article.css';
import { CREATE_COMMENT_MUTATION } from '../Comments/createComment';
import { useNavigate } from 'react-router-dom';
import { UserInterface } from '../../Interfaces/Interfaces';
import { UserInfo } from '../../context/UserContext';


const GET_ARTICLE_BY_ID = graphql(`
  query GetArticleById($articleId: ID!) {
    getArticleById(articleId: $articleId) {
      author {
        id
        email
        username
        bio
      }
      authorId
      comment {
        articleId
        author {
          id
          email
          username
          bio
        }
        authorId
        content
        createdAt
        id
        updatedAt
      }
      content
      id
      like {
        user {
          id
          email
          username
          bio
        }
        id
        createdAt
        articleId
        userId
      }
      published
      title
    }
  }
`);

interface ArticleProps {
  id: string;
}


const Article: React.FC<ArticleProps> = () => {
    const { id } = useParams<{ id: string }>();
    console.log('articleId from URL:', id);

    const [commentText, setCommentText] = useState('');
    const [createComment] = useMutation(CREATE_COMMENT_MUTATION);
    const navigate = useNavigate();




  const sendComment = async () => {
    try {
        const { data } = await createComment({
          variables: {
            authorId: localStorage.getItem("userId"),
            articleId: id,
            content: commentText
          }
        });
  
        if (data.createComment.success) {
          console.log("Comment created successfully:", data.createComment.comment);
          setCommentText('');
          navigate(0);
        } else {
          console.error("Failed to create comment:", data.createComment.message);
        }
      } catch (error) {
        console.error("Error creating comment:", error);
      }
  };

  const { loading, error, data } = useQuery<ArticleData>(GET_ARTICLE_BY_ID, {
    variables: { articleId: id }
  });

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>Error loading article: {error.message}</div>;
  if (!data) return <div>No article data found</div>;

  const article: ArticleInterface = data.getArticleById;

  return (
    <div className="article-detail-container">
      <div className="article-content-box">
        <h1 className="article-title">{article.title}</h1>
        <p className="article-content">{article.content}</p>
        <div className="article-meta">
          <span className="article-likes">
            <FaHeart /> {article.like?.length}
          </span>
          <span className="article-author">@{article.author.username}</span>
        </div>
      </div>

      <div className="comment-box">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={sendComment}>Send Comment</button>
      </div>

      <div className="comments-section">
        <h3>Comments ({article.comment?.length ?? 0})</h3>
        {(article.comment?.length ?? 0 ) > 0 ? (
          <ul className="comment-list">
            {article.comment?.map((commentItem) => (
              <li key={commentItem.id} className="comment">
                <p className="comment-author">{commentItem.author.username}</p>
                <p className="comment-content">{commentItem.content}</p>
                <p className="comment-date">
                  {new Date(commentItem.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default Article;