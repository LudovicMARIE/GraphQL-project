// import { ArticleModel } from "../../models/models.js";
import { Like } from "@prisma/client";
import { MutationResolvers } from "../../types.js";


export const toggleLike: MutationResolvers['toggleLike'] = async (_, {userId, articleId}, {dataSources: {db}}) => {
    try {

        
        const like: Like | null = await db.like.findUnique({
            where: {
                userId_articleId: {
                    userId: userId,
                    articleId: articleId
                }
            }
        });

        if(like != null){
            const likeDeleted: Like = await db.like.delete({
                where: {
                    id: like.id
                }
            });
            return {
                code : 200,
                success: true,
                message : 'the article has been unliked ' + like?.id,
            }
        }else{
            const toggleLike = await db.like.create({
                data: {
                    userId,
                    articleId,
                }
            });
            return {
                code : 200,
                success: true,
                message : 'the article has been liked ' + toggleLike.id,
            }
        }

    }catch (e){
        return {
            code: 400,
            success: false,
            message: (e as Error).message,
        }
    }
}