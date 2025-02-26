import { createUser } from "../mutations/users/createUser.js";
import { createArticle } from "../mutations/articles/createArticle.js";
import { updateArticle } from "../mutations/articles/updateArticles.js";
import { deleteArticle } from "../mutations/articles/deleteArticle.js";
import { signIn } from "../mutations/users/signIn.js";
import { Resolvers } from "../types.js"
import { createComment } from "../mutations/articles/createComment.js";
import { updateUser } from "../mutations/users/updateUser.js";
import { articleQueries } from "../mutations/articles/getArticles.js";

export const resolvers: Resolvers = {
    Query: {
      ...articleQueries,
    },
    Mutation: {
      createUser,
      signIn,
      updateUser,
      createArticle,
      updateArticle,
      deleteArticle,
      createComment,
    }
}