import { gql, useMutation } from "@apollo/client";
import { graphql } from "../../gql/gql";


const UPDATE_COMMENT_MUTATION = graphql(`
  mutation UpdateComment($updateCommentId: ID!, $content: String!) {
  updateComment(id: $updateCommentId, content: $content) {
    code
    success
    message
    comment {
      id
      content
      authorId
      articleId
      createdAt
      updatedAt
    }
  }
}
`);

interface UpdateCommentResponse {
  updateComment: {
    code: string;
    success: boolean;
    message: string;
    comment: Comment;
  }
}