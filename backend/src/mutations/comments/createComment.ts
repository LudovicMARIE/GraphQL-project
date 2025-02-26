import { MutationResolvers } from "../../types.js";

export const createComment: MutationResolvers['createComment'] = async (_, { authorId, content, articleId }, { dataSources: { db }, user }) => {

  try {

    if (!user?.id) {
      return {
        code: 401,
        success: false,
        message: "Vous devez être connecté pour poster un commentaire",
        comment: null
      };
    }

    const createdComment = await db.comment.create({
      data: {
        authorId,
        content,
        articleId
      }
    });

    return {
      code: 201,
      success: true,
      message: "Le commentaire à bien été posté",
      comment: createdComment
    }
  } catch (e) {
    return {
      code: 400,
      success: false,
      message: "Erreur lors de la publication du commentaire",
      // message: (e as Error).message,
      comment: null,
    }
  }
}