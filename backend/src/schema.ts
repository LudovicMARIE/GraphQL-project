import gql from "graphql-tag";

export const typeDefs = gql`

  type Query {
    # Get all likes
    likes: [Like!]!
    
    # Get a specific like by ID
    like(id: ID!): Like
    
    # Get likes by article ID
    likesByArticle(articleId: ID!): [Like!]!
    
    # Get likes by user ID
    likesByUser(userId: ID!): [Like!]!
    
    # Count likes for an article
    likeCount(articleId: ID!): Int!
    
    # Check if a user has liked an article
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


    # Create a new like
    createLike(userId: ID!, articleId: ID!): Like!
    
    # Delete a like by ID
    deleteLike(id: ID!): Boolean!
    
    # Delete a like by user ID and article ID
    unlikeArticle(userId: ID!, articleId: ID!): Boolean!
    
    # Toggle like status (like if not liked, unlike if already liked)
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

  type Like {
    id: ID!
    createdAt: String!
    userId: ID!
    user: User!
    articleId: ID!
    article: String!
  }
    
`;