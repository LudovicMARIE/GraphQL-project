import { createUser } from "../mutations/users/createUser.js";
import { createArticle } from "../mutations/articles/createArticle.js";
import { updateArticle } from "../mutations/articles/updateArticles.js";
import { deleteArticle } from "../mutations/articles/deleteArticle.js";
import { signIn } from "../mutations/users/signIn.js";
import { Resolvers } from "../types.js"
import { createComment } from "../mutations/comments/createComment.js";
import { updateUser } from "../mutations/users/updateUser.js";
import { articleQueries } from "../mutations/articles/getArticles.js";
import { updateComment } from "../mutations/comments/updateComment.js";
import { deleteComment } from "../mutations/comments/deleteComment.js";
import { toggleLike } from "../mutations/likes/toggleLike.js";

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
      updateComment,
      deleteComment,
      toggleLike
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
      },
      comment: async (parent, _, { dataSources }) => {
        const comments = await dataSources.db.comment.findMany({
          where: { articleId: parent.id },
          select: {
            id: true,
            content: true,
            author: true,
            authorId: true,
            articleId: true,
            createdAt: true,  
            updatedAt: true,
          }
        });
        console.log(comments);
        return comments;
      },
    },
    Like: {
      user: async (parent, _, { dataSources }) => {
        const user = await dataSources.db.user.findUnique({
          where: { id: parent.userId },
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
      },
      article: async (parent, _, { dataSources }) => {
        const article = await dataSources.db.article.findUnique({
          where: { id: parent.articleId },
          select: {
            id: true,
            title: true,
            content: true,
            published: true,
            createdAt: true,
            updatedAt: true,
            authorId: true,
          }
        });
        if (!article) {
          throw new Error("Auteur non trouvé");
        }
        return article;
      },
    }
}