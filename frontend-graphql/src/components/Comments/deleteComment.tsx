import { gql, useMutation } from "@apollo/client";


export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($deleteCommentId: ID!) {
  deleteComment(id: $deleteCommentId) {
    code
    success
    message
  }
}
`;

interface DeleteCommentResponse {
  deleteComment: {
    code: string;
    success: boolean;
    message: string;
  }
}