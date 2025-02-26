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
            throw new Error('User not found try with another email')
        }

        let isPasswordValid: boolean = await comparePasswords(password, user.password)
        let username: string = user.username

        
        if(!isPasswordValid){
            throw new Error('Invalid password')
        }
            
        console.log(user);
        const userToken: string = createJWT(user)
      
        return {
          code: 201,
          success: true,
          message: `user ${email} | ${username} has been logged `,
          token: userToken,
        }
      } catch (error){
         return {
          code: 400,
          message: 'User has not been logged' + error,
          success: false,
          token: ""
        }
      }
}