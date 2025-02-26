import gql from "graphql-tag";

export const typeDefs = gql`

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
  }

  type CreateUserResponse{
    code: Int!
    success: Boolean!
    message: String!
    user: User
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
    
`;
    // createdAt: DateTime!