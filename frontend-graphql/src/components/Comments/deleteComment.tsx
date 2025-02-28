import { gql, useMutation } from "@apollo/client";
import { graphql } from "../../gql/gql";


const DELETE_COMMENT_MUTATION = graphql(`
  mutation DeleteComment($deleteCommentId: ID!) {
    deleteComment(id: $deleteCommentId) {
      code
      success
      message
    }
  }
`);

interface DeleteCommentResponse {
  deleteComment: {
    code: string;
    success: boolean;
    message: string;
  }
}