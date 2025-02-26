import { MutationResolvers } from "../../types.js";

export const deleteComment: MutationResolvers['deleteComment'] = async (_, { id }, { dataSources: { db }, user }) => {

  try {

    if (!user?.id) {
      return {
        code: 401,
        success: false,
        message: 'Vous devez être connecté pour supprimer un commentaire',
        article: null
      };
    }

    const existingComment = await db.comment.findUnique({
      where: { id: id },
    });

    if (!existingComment) {
      return {
        code: 404,
        success: false,
        message: "Commentaire non trouvé",
        comment: null,
      };
    }

    if (existingComment.authorId !== user?.id) {
      return {
          code: 403,
          success: false,
          message: "Vous n'êtes pas autorisé à supprimer ce commentaire",
          article: null,
      };
    }

    await db.comment.delete({
      where: { id: id },
    });


    return {
      code: 201,
      success: true,
      message: 'Le commentaire à bien été supprimé',
    }
  } catch (e) {
    return {
      code: 400,
      success: false,
      message: "Erreur lors de la suppression du commentaire",
      // message: (e as Error).message,
      comment: null,
    }
  }
}