import { gql, useMutation } from "@apollo/client";


const UPDATE_COMMENT_MUTATION = gql`
  mutation UpdateComment($authorId: ID!, $articleId: ID!, $content: String!) {
  UpdateComment(authorId: $authorId, articleId: $articleId, content: $content) {
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
`;

interface UpdateCommentResponse {
  updateComment: {
    code: string;
    success: boolean;
    message: string;
    comment: Comment;
  }
}