import { MutationResolvers } from "../../types.js";

export const deleteArticle: MutationResolvers['deleteArticle'] = async (_, { articleId }, { dataSources: { db }, user }) => {
    try {
      if (!user?.id) {
        return {
          code: 401,
          success: false,
          message: "Vous devez être connecté pour modifier un article",
          article: null,
        };
      }

      const existingArticle = await db.article.findUnique({
        where: { id: articleId },
      });

      if (!existingArticle) {
        return {
          code: 404,
          success: false,
          message: "Article non trouvé",
          article: null,
        };
      }

      if (existingArticle.authorId !== user?.id) {
        return {
          code: 403,
          success: false,
          message: "Vous n'êtes pas autorisé à supprimer cet article",
          article: null,
        };
      }

      const updatedArticle = await db.article.delete({
        where: { id: articleId },
      });

      return {
        code: 200,
        success: true,
        message: "Article supprimé avec succès",
        article: updatedArticle,
      };
    } catch (e) {
      return {
        code: 500,
        success: false,
        message: "Erreur lors de la suppression de l'article",
        article: null,
      };
    }
  };
