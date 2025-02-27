// import { ArticleModel } from "../../models/models.js";
import { Like } from "@prisma/client";
import { MutationResolvers } from "../../types.js";


export const toggleLike: MutationResolvers['toggleLike'] = async (_, {userId, articleId}, {dataSources: {db}, user}) => {
    try {
        
        if (!user?.id) {
            return {
              code: 401,
              success: false,
              message: "Vous devez être connecté pour créer un article",
              article: null
            };
          }

        const like = await db.like.findUnique({
            where: {
                userId_articleId: {
                    userId: userId,
                    articleId: articleId
                }
            }
        });

        if(like != null){
            await db.like.delete({
                where: {
                    id: like.id
                }
            });
            return {
                code : 200,
                success: true,
                message : "Votre like sur l\'article a été retiré",
            }
        }else{
            const createdLike = await db.like.create({
                data: {
                    userId,
                    articleId,
                }
            });
            return {
                code : 200,
                success: true,
                message: "L\'article a été liké",
                like: createdLike, 
            }
        }

    }catch (e){
        return {
            code: 400,
            success: false,
            message: "Une erreur est survenue, l'action n'a pas pu aboutir",
            // message: (e as Error).message,
        }
    }
}