import { User } from "@prisma/client";
import { hashPassword } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";
 
// add createdAt
export const createUser: MutationResolvers['createUser'] = async (_, {email, password, username, bio}, {dataSources: {db}}) => {
  try {
    const createdUser: User = await db.user.create({
      data: {
        email,
        password: await hashPassword(password),
        username,
        bio
      }
    })
    return {
      code: 201,
      success: true,
      message: 'the user has been created',
      user: {
        id: createdUser.id,
        email: createdUser.email,
        username: createdUser.username,
        bio: createdUser.bio
      }
    }
  } catch(e) {
    return {
      code: 400,
      success: false,
      message: (e as Error).message,
      user: null,
    }
  }
};