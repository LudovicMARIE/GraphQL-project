// import { ArticleModel } from "../../models/models.js";
import { MutationResolvers } from "../../types.js";


export const toggleLike: MutationResolvers['toggleLike'] = async (_, {userId, articleId}, {dataSources: {db}}) => {
    try {
    // const article: ArticleModel = await db.article.findFirstOrThrow({
    //     where: { id: articleId}
    // })

    const toggleLike = await db.like.create({
        data: {
            userId,
            articleId,
        }
    });

    return {
        code : 201,
        success: true,
        message : 'the article has been liked',
    }


    }catch (e){
        return {
            code: 400,
            success: false,
            message: (e as Error).message,
        }
    }
}