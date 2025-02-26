import { MutationResolvers } from "../../types.js";

export const updateComment: MutationResolvers['updateComment'] = async (_, { id, content }, { dataSources: { db }, user }) => {

  try {

    if (!user?.id) {
      return {
        code: 401,
        success: false,
        message: 'Vous devez être connecté pour modifier un commentaire',  
        comment: null
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
            // message: (e as Error).message,
        };
    }

    if (existingComment.authorId !== user?.id) {
      return {
        code: 403,
        success: false,
        message: "Vous n'êtes pas autorisé à modifier ce commentaire",
        comment: null,
      };
    }
     
    const updatedComment = await db.comment.update({
      where: { id: id },
        data: {
          content: content ?? existingComment.content,
        }
    });

    return {
      code: 201,
      success: true,
      message: 'Le commentaire à bien été modifié',
      comment: updatedComment
    }
  } catch (e) {
    return {
      code: 400,
      success: false,
      message: "Erreur lors de la mise à jour du commentaire",
      // message: (e as Error).message,
      comment: null,
    }
  }
}