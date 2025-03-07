import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { gql, useMutation } from "@apollo/client";
import { Comment } from '../../gql/graphql';
import { graphql } from '../../gql/gql';

export const CREATE_COMMENT_MUTATION = graphql(`
  mutation CreateComment($authorId: ID!, $articleId: ID!, $content: String!) {
    createComment(authorId: $authorId, articleId: $articleId, content: $content) {
      code
      success
      message
      comment {
        id
        content
        createdAt
      }
    }
  }
`);

interface CreateCommentResponse {
  createComment: {
    code: string;
    success: boolean;
    message: string;
    comment: Comment;
  }
}