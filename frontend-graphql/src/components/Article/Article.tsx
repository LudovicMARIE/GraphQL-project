import React from 'react';
import { gql, useQuery } from "@apollo/client";
import { ArticleData, ArticleInterface, CommentInterface } from '../../Interfaces/Interfaces';
import { useParams } from 'react-router-dom';
import { graphql } from '../../gql/gql';

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
  const { loading, error, data } = useQuery<ArticleData>(GET_ARTICLE_BY_ID, {
    variables: { articleId: id }
  });

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>Error loading article: {error.message}</div>;
  if (!data) return <div>No article data found</div>;

  const article: ArticleInterface = data.getArticleById;

  return (
    <div className="article-container">
      <div className="article-header">
        <h1>{article.title}</h1>
        <p>By: {article.author.username}</p>
        <p>Status: {article.published ? 'Published' : 'Draft'}</p>
      </div>

      <div className="article-content">
        <p>{article.content}</p>
      </div>

      <div className="article-meta">
        <div className="likes-section">
          <h3>Likes ({article.like?.length ?? 0})</h3>
          {(article.like?.length ?? 0) > 0 ? (
            <ul>
              {article.like?.map((like) => (
                <li key={like.id}>
                  {like.user?.username} liked this article on {new Date(like.createdAt).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No likes yet</p>
          )}
        </div>

        <div className="comments-section">
          <h3>Comments ({article.comment?.length ?? 0})</h3>
          {(article.comment?.length ?? 0) > 0 ? (
            <ul>
              {article.comment?.map((commentItem: CommentInterface) => (
                <li key={commentItem.id} className="comment">
                  <p><strong>{commentItem.author.username}</strong> on {new Date(commentItem.createdAt).toLocaleDateString()}</p>
                  <p>{commentItem.content}</p>
                  <p className="comment-meta">Last updated: {new Date(commentItem.updatedAt).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet</p>
          )}
        </div>
      </div>

      <div className="article-debug">
        <h4>Article Debug Information</h4>
        <p>Article ID: {article.id}</p>
        <p>Author ID: {article.authorId}</p>
        <p>Author Email: {article.author.email}</p>
        <p>Author Bio: {article.author.bio}</p>
      </div>
    </div>
  );
};

export default Article;