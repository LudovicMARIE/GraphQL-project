import { QueryResolvers } from "../../types.js";

export const userQueries: QueryResolvers = {

  // Récupérer tous les users
//   getAllUsers: async (_, __, { dataSources: { db } }) => {
//     try {
//       const articles = await db.user.findMany();
//       return articles;
//     } catch (e) {
//       throw new Error("Erreur lors de la récupération des articles");
//     }
//   },

  // Récupérer un article spécifique
  getUserById: async (_, { userId }, { dataSources: { db } }) => {
    try {
      const user = await db.user.findFirstOrThrow({
        where: { id: userId },
      });
      return user;
    } catch (e) {
      throw new Error("Erreur lors de la récupération des users de l'utilisateur");
    }
  },
};
