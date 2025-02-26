import { MutationResolvers } from "../../types.js";
import bcrypt from "bcrypt";

export const updateUser: MutationResolvers["updateUser"] = async (_, { id, password, username, bio }, { dataSources: { db } }) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return {
        code: 404,
        success: false,
        message: "User not found",
        user: null,
      };
    }

    let updateData: { username?: string; password?: string; bio?: string } = {};

    if (username) updateData.username = username;
    if (bio) updateData.bio = bio;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await db.user.update({
      where: { id },
      data: updateData,
    });

    return {
      code: 200,
      success: true,
      message: "User profile updated successfully",
      user: updatedUser,
    };
  } catch (e) {
    return {
      code: 500,
      success: false,
      message: (e as Error).message,
      user: null,
    };
  }
};
