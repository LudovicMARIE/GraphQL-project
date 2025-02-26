import { MutationResolvers } from "../../types.js";

export const createComment: MutationResolvers['createComment'] = async (_, { authorId, content, articleId }, { dataSources: { db } }) => {

  try {
    const createComment = await db.comment.create({
      data: {
        authorId,
        content,
        articleId
      }
    });

    const user = await db.user.findUnique({
      where: { id: authorId }
    });

    return {
      code: 201,
      success: true,
      message: 'the comment has been created',
      user: user
    }
  } catch (e) {
    return {
      code: 400,
      success: false,
      message: (e as Error).message,
      user: null,
    }
  }
}