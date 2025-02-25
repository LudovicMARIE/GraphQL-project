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
  }

  type CreateUserResponse{
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
    
`;
    // createdAt: DateTime!