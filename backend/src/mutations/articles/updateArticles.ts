import { MutationResolvers } from "../../types.js";

export const updateArticle: MutationResolvers['updateArticle'] = async (_, { articleId, title, content, published }, { dataSources: { db }, user }) => {
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
          message: "Vous n'êtes pas autorisé à modifier cet article",
          article: null,
        };
      }

      const updatedArticle = await db.article.update({
        where: { id: articleId },
        data: {
          title: title ?? existingArticle.title,
          content: content ?? existingArticle.content,
          published: published ?? existingArticle.published,
        },
      });

      return {
        code: 200,
        success: true,
        message: "Article mis à jour avec succès",
        article: updatedArticle,
      };
    } catch (e) {
      return {
        code: 500,
        success: false,
        message: "Erreur lors de la mise à jour de l'article",
        // message: (e as Error).message,
        article: null,
      };
    }
  };
