import { createUser } from "../mutations/users/createUser.js";
import { createArticle } from "../mutations/articles/createArticle.js";
import { updateArticle } from "../mutations/articles/updateArticles.js";
import { signIn } from "../mutations/users/signIn.js";
import { Resolvers } from "../types.js"
import { articleQueries } from "../mutations/articles/getArticles.js";


export const resolvers: Resolvers = {
    Query: {
      ...articleQueries,
    },
    Mutation: {
      createUser,
      signIn,
      createArticle,
      updateArticle,
    }
}