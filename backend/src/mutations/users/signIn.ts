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
            throw new Error('User not found try with another email')
        }

        var isPasswordValid = await comparePasswords(password, user.password)
        var username = user.username

        
        if(!isPasswordValid){
            throw new Error('Invalid password')
        }
            
        const userToken = createJWT(user)
      
        return {
          code: 201,
          success: true,
          message: `user ${email} | ${username} has been logged `,
          token: userToken,
        }
      } catch {
        return {
          code: 400,
          message: 'User has not been logged',
          success: false,
          token: ""
        }
      }
}