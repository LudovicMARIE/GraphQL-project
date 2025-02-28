import {MutationResolvers} from "../../types.js"
import { comparePasswords } from "../../modules/auth.js";
import {createJWT} from "../../modules/auth.js"
import { User } from "@prisma/client";

export const signIn: MutationResolvers['signIn'] = async  (_, {email, password}, {dataSources: {db}}) => {
    try {
        const user: User = await db.user.findFirstOrThrow({
        where: {
            email: email,
        },
        })

        if(!user){
            throw new Error("Utilisateur introuvale essayez avec un autre email")
        }

        let isPasswordValid: boolean = await comparePasswords(password, user.password)
        let username: string = user.username

        
        if(!isPasswordValid){
            throw new Error("Mot de passe invalide")
        }
            
        // console.log(user);
        const userToken: string = createJWT(user)
      
        return {
          code: 201,
          success: true,
          message: `L'utilisateur ${email} | ${username} est connecté(e)`,
          token: userToken,
        }
      } catch (error){
         return {
          code: 400,
          message: "Erreur lors de la connexion de l\'utilisateur",
          // message: (e as Error).message,
          success: false,
          token: ""
        }
      }
}