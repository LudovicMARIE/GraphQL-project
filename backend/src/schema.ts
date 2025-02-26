import gql from "graphql-tag";

export const typeDefs = gql`
  scalar DateTime
  type Query {
    add(number1: Float!, number2: Float!): Float!
    substract(number1: Float!, number2: Float!): Float!
    multiply(number1: Float!, number2: Float!): Float!
    divide(number1: Float!, number2: Float!): Float
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
    createArticle(
      title: String!
      content: String!
      published: Boolean
    ): CreateArticleResponse!
    createComment(
      authorId: ID!, articleId: ID!, content: String!
    ): CreateCommentResponse
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

  type Article {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    authorId: String!
    author: User
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
    
`;
    // createdAt: DateTime!