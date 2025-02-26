import gql from "graphql-tag";

export const typeDefs = gql`
  scalar DateTime
  type Query {
    getAllArticles: [Article!]!
    getArticlesByUserId(userId: ID!): [Article!]!
    getArticleById(articleId: ID!): Article!
    
    likes: [Like!]!
    like(id: ID!): Like
    likesByArticle(articleId: ID!): [Like!]!
    likesByUser(userId: ID!): [Like!]!
    likeCount(articleId: ID!): Int!
    hasUserLiked(userId: ID!, articleId: ID!): Boolean!
  }

  type Mutation{
    createUser(
      email: String!
      password: String!
      username: String!
      bio: String
    ): CreateUserResponse
    
    signIn(
      email: String!
      password: String!
    ): SignInResponse
    
    updateUser(
      id: ID!, username: String, password: String, bio: String
    ): UpdateUserResponse!
    
    createArticle(
      title: String!
      content: String!
      published: Boolean
    ): CreateArticleResponse!
    

    
    updateArticle(
      articleId: ID!
      title: String
      content: String
      published: Boolean
    ): UpdateArticleResponse!
    
    deleteArticle(
      articleId: ID!
    ): DeleteArticleResponse!
    createComment(
      authorId: ID!
      articleId: ID!
      content: String!
    ): CreateCommentResponse
    
    deleteLike(id: ID!): Boolean!
    
    unlikeArticle(userId: ID!, articleId: ID!): Boolean!
    
    toggleLike(userId: ID!, articleId: ID!): LikeToggleResponse!
  }

  type LikeToggleResponse {
    code: Int!
    success: Boolean!
    message: String!
    like: Like
  }

  type CreateUserResponse{
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }

  type CreateArticleResponse{
    code: Int!
    success: Boolean!
    message: String!
    article: Article
  }

  type UpdateArticleResponse {
    code: Int!
    success: Boolean!
    message: String!
    article: Article
  }

  type DeleteArticleResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type SignInResponse{
    code: Int!
    success: Boolean!
    message: String!
    token: String!
  }

  type CreateCommentResponse{
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }

  type User{
    id: ID!
    email: String!
    username: String!
    bio: String
  }

  type UpdateUserResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }

  type Article {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    authorId: String!
    author: User!
  }

  type Comment {
    id: ID!
    content: String!
    authorId: String!
    author: User!
    articleId: String!
    article: Article!
    createdAt: DateTime!
  }
    

  type Like {
    id: ID!
    createdAt: String!
    userId: ID!
    user: User!
    articleId: ID!
    article: String!
  }
    
`;