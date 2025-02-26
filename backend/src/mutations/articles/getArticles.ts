import { QueryResolvers } from "../../types.js";

export const articleQueries: QueryResolvers = {
    
  // Récupérer tous les articles
  getAllArticles: async (_, __, { dataSources: { db } }) => {
    try {
      const articles = await db.article.findMany();
      return articles;
    } catch (e) {
      throw new Error("Erreur lors de la récupération des articles");
    }
  },

  // Récupérer les articles d'un utilisateur spécifique
  getArticlesByUserId: async (_, { userId }, { dataSources: { db } }) => {
    try {
      const articles = await db.article.findMany({
        where: { authorId: userId },
      });
      return articles;
    } catch (e) {
      throw new Error("Erreur lors de la récupération des articles de l'utilisateur");
    }
  },
};
