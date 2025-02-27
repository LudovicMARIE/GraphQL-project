import { User } from "@prisma/client";
import { MutationResolvers } from "../../types.js";
import bcrypt from "bcrypt";

export const updateUser: MutationResolvers["updateUser"] = async (_, { id, password, username, bio }, { dataSources: { db } }) => {
  try {
    const user: User | null= await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return {
        code: 404,
        success: false,
        message: "Utilisateur introuvale",
        user: null,
      };
    }

    let updateData: { username?: string; password?: string; bio?: string } = {};

    if (username) updateData.username = username;
    if (bio) updateData.bio = bio;
    if (password) {
      const hashedPassword: string = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser: User = await db.user.update({
      where: { id },
      data: updateData,
    });

    return {
      code: 200,
      success: true,
      message: "L'utilisateur à bien été mis à jour",
      user: updatedUser,
    };
  } catch (e) {
    return {
      code: 500,
      success: false,
      message: "Erreur lors de la mise à jour de l\'utilisateur",
      // message: (e as Error).message,
      user: null,
    };
  }
};
