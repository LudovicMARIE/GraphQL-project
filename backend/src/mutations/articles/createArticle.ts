import { MutationResolvers } from "../../types.js";
 

export const createArticle: MutationResolvers['createArticle'] = async (_, {title, content}, {dataSources: {db}, user}) => {
  try {
    // console.log("user createArticle: ", user);
    if (!user?.id) {
        return {
          code: 401,
          success: false,
          message: 'Vous devez être connecté pour créer un article',
          article: null
        };
      }

    const createdArticle = await db.article.create({
    data: {
        title,
        content,
        published: false, 
        authorId: user.id,
    }
    });
    return {
        code: 201,
        success: true,
        message: 'L\'article a été créé avec succès',
        article: createdArticle
      };
  } catch (e) {
    return {
      code: 400,
      success: false,
      message: (e as Error).message,
      article: null
    };
  }
};