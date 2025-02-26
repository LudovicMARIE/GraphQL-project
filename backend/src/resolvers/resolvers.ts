import { createUser } from "../mutations/users/createUser.js";
import { createArticle } from "../mutations/articles/createArticle.js";
import { signIn } from "../mutations/users/signIn.js";
import { Resolvers } from "../types.js"
import { createComment } from "../mutations/articles/createComment.js";
import { updateUser } from "../mutations/users/updateUser.js";


export const resolvers: Resolvers = {
    Query: {
        
    },
    Mutation: {
      createUser,
      signIn,
      updateUser,
      createArticle,
      createComment,
    }
}