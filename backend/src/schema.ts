import gql from "graphql-tag";

export const typeDefs = gql`
  scalar DateTime
  type Query {
    getAllArticles: [Article!]!
    getArticlesByUserId(userId: ID!): [Article!]!
    getArticleById(articleId: ID!): Article!
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
      id: ID!, 
      username: String, 
      password: String, 
      bio: String
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

    updateComment(
      id: ID!
      content: String!
    ): UpdateCommentResponse

    deleteComment(
      id: ID!
    ): DeleteCommentResponse

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
    comment: Comment
  }

  type UpdateCommentResponse{
    code: Int!
    success: Boolean!
    message: String!
    comment: Comment
  }

  type DeleteCommentResponse{
    code: Int!
    success: Boolean!
    message: String!
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
    comment: [Comment!]
  }

  type Comment {
    id: ID!
    content: String!
    authorId: String!
    author: User!
    articleId: String!
    article: Article!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
    
`;
    // createdAt: DateTime!