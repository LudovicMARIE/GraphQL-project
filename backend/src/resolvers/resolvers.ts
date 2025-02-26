import { createUser } from "../mutations/users/createUser.js";
import { createArticle } from "../mutations/articles/createArticle.js";
import { updateArticle } from "../mutations/articles/updateArticles.js";
import { deleteArticle } from "../mutations/articles/deleteArticle.js";
import { signIn } from "../mutations/users/signIn.js";
import { Resolvers } from "../types.js"
import { articleQueries } from "../mutations/articles/getArticles.js";
import { createComment } from "../mutations/comments/createComment.js";


export const resolvers: Resolvers = {
    Query: {
      ...articleQueries,
    },
    Mutation: {
      createUser,
      signIn,
      createArticle,
      updateArticle,
      deleteArticle,
      createComment,
    },
    Article: {
      author: async (parent, _, { dataSources }) => {
        const user = await dataSources.db.user.findUnique({
          where: { id: parent.authorId },
          select: {
            id: true,
            email: true,
            username: true,
            bio: true,
            createdAt: true,  
            updatedAt: true,
          }
        });
        if (!user) {
          throw new Error("Auteur non trouvé");
        }
    
        return user;
      } 
    },
}