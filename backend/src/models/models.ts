import { Article, Comment, User, Like } from "@prisma/client";

export type AuthorModel = Omit<User, 'password'>

export type ArticleModel = Article

export type CommentModel = Comment

export type LikeModel = Like