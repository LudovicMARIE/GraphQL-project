import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";

// interface TokenPayload {
//   id: string;
//   email: string;
//   username: string;
//   bio?: string | null;
//   createdAt: Date | string;
//   updatedAt: Date | string;
// }

const JWT_SECRET = process.env.JWT_SECRET as string;
// const JWT_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN);
 
export const createJWT = (user: User) => {
  const token: string = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET, 
    // { expiresIn: JWT_EXPIRES_IN }
  );
  return token;
};

export type AuthenticatedUser = Pick<User, 'id' | 'username'>
 
export const getUser = (token: string): AuthenticatedUser | null => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthenticatedUser
    return payload;
  } catch {
    return null
  }
}

export const comparePasswords = (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
 
export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 5);
};

// export function verifyToken(token: string): TokenPayload {
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     return decoded as TokenPayload;
//   } catch (error) {
//     // Gestion des erreurs spécifiques avec types
//     if (error instanceof jwt.TokenExpiredError) {
//       console.log("error instanceof jwt.TokenExpiredError");
//       throw new Error('Token expiré, veuillez vous reconnecter');
//     } else if (error instanceof jwt.JsonWebTokenError) {
//       console.log("error instanceof jwt.JsonWebTokenError");
//       throw new Error('Token invalide');
//     }
//     // Si l'erreur n'est pas une des instances ci-dessus
//     throw new Error(`Erreur d'authentification: ${(error as Error).message}`);
//   }
// }