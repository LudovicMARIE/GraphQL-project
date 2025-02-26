import gql from "graphql-tag";

export const typeDefs = gql`

  type Query {
    getAllArticles: [Article!]!
    getArticlesByUserId(userId: ID!): [Article!]!
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
    author: [User]!
  }
    
`;
    // createdAt: DateTime!