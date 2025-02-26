import {MutationResolvers} from "../../types.js"
import { comparePasswords } from "../../modules/auth.js";
import {createJWT} from "../../modules/auth.js"

export const signIn: MutationResolvers['signIn'] = async  (_, {email, password}, {dataSources: {db}}) => {
    try {
        const user = await db.user.findFirstOrThrow({
        where: {
            email: email,
        },
        })

        if(!user){
            throw new Error("Utilisateur introuvale essayez avec un autre email")
        }

        var isPasswordValid = await comparePasswords(password, user.password)
        var username = user.username

        
        if(!isPasswordValid){
            throw new Error("Mot de passe invalide")
        }
            
        const userToken = createJWT(user)
      
        return {
          code: 201,
          success: true,
          message: `L'utilisateur ${email} | ${username} est connecté(e)`,
          token: userToken,
        }
      } catch {
        return {
          code: 400,
          message: "Erreur lors de la connexion de l\'utilisateur",
          // message: (e as Error).message,
          success: false,
          token: ""
        }
      }
}