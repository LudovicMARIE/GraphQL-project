import { Article, Comment, User } from "@prisma/client";

export type AuthorModel = Omit<User, 'password'>

export type ArticleModel = Article

export type CommentModel = Comment