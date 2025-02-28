/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetArticleById($articleId: ID!) {\n    getArticleById(articleId: $articleId) {\n      author {\n        id\n        email\n        username\n        bio\n      }\n      authorId\n      comment {\n        articleId\n        author {\n          id\n          email\n          username\n          bio\n        }\n        authorId\n        content\n        createdAt\n        id\n        updatedAt\n      }\n      content\n      id\n      like {\n        user {\n          id\n          email\n          username\n          bio\n        }\n        id\n        createdAt\n        articleId\n        userId\n      }\n      published\n      title\n    }\n  }\n": typeof types.GetArticleByIdDocument,
    "\n    query GetAllArticles {\n      getAllArticles {\n        author {\n          id\n          email\n          username\n          bio\n        }\n        authorId\n        content\n        id\n        published\n        title\n        like {\n          userId\n          id\n          createdAt\n          articleId\n        }\n      }\n    }\n": typeof types.GetAllArticlesDocument,
    "\n  mutation CreateArticle($title: String!, $content: String!) {\n    createArticle(title: $title, content: $content) {\n      code\n      success\n      message\n      article {\n        id\n        title\n        content\n        published\n        authorId\n        author {\n          id\n          email\n          username\n          bio\n        }\n      }\n    }\n  }\n": typeof types.CreateArticleDocument,
    "\n  mutation DeleteArticle($articleId: ID!) {\n    deleteArticle(articleId: $articleId) {\n      success\n      message\n    }\n  }\n": typeof types.DeleteArticleDocument,
    "\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      code\n      success\n      message\n      token\n      user {\n        id\n        email\n        username\n        bio\n      }\n    }\n  }\n": typeof types.SignInDocument,
    "\n  mutation createUser($email: String!, $password: String!, $username: String!, $bio: String) {\n    createUser(email: $email, password: $password, username: $username, bio: $bio) {\n      code\n      success\n      message\n      user {\n        id\n        email\n        username\n        bio\n      }\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  mutation CreateComment($authorId: ID!, $articleId: ID!, $content: String!) {\n    createComment(authorId: $authorId, articleId: $articleId, content: $content) {\n      code\n      success\n      message\n      comment {\n        id\n        content\n        createdAt\n      }\n    }\n  }\n": typeof types.CreateCommentDocument,
    "\n  mutation DeleteComment($deleteCommentId: ID!) {\n    deleteComment(id: $deleteCommentId) {\n      code\n      success\n      message\n    }\n  }\n": typeof types.DeleteCommentDocument,
    "\n  mutation UpdateComment($updateCommentId: ID!, $content: String!) {\n  updateComment(id: $updateCommentId, content: $content) {\n    code\n    success\n    message\n    comment {\n      id\n      content\n      authorId\n      articleId\n      createdAt\n      updatedAt\n    }\n  }\n}\n": typeof types.UpdateCommentDocument,
    "\n  query GetUserById($userId: ID!) {\n    getUserById(userId: $userId) {\n      id\n      email\n      username\n      bio\n    }\n  }\n": typeof types.GetUserByIdDocument,
    "\n  mutation Mutation($updateUserId: ID!, $username: String, $password: String, $bio: String) {\n    updateUser(id: $updateUserId, username: $username, password: $password, bio: $bio) {\n      code\n      success\n      message\n      user {\n        id\n        email\n        username\n        bio\n      }\n    }\n  }\n": typeof types.MutationDocument,
};
const documents: Documents = {
    "\n  query GetArticleById($articleId: ID!) {\n    getArticleById(articleId: $articleId) {\n      author {\n        id\n        email\n        username\n        bio\n      }\n      authorId\n      comment {\n        articleId\n        author {\n          id\n          email\n          username\n          bio\n        }\n        authorId\n        content\n        createdAt\n        id\n        updatedAt\n      }\n      content\n      id\n      like {\n        user {\n          id\n          email\n          username\n          bio\n        }\n        id\n        createdAt\n        articleId\n        userId\n      }\n      published\n      title\n    }\n  }\n": types.GetArticleByIdDocument,
    "\n    query GetAllArticles {\n      getAllArticles {\n        author {\n          id\n          email\n          username\n          bio\n        }\n        authorId\n        content\n        id\n        published\n        title\n        like {\n          userId\n          id\n          createdAt\n          articleId\n        }\n      }\n    }\n": types.GetAllArticlesDocument,
    "\n  mutation CreateArticle($title: String!, $content: String!) {\n    createArticle(title: $title, content: $content) {\n      code\n      success\n      message\n      article {\n        id\n        title\n        content\n        published\n        authorId\n        author {\n          id\n          email\n          username\n          bio\n        }\n      }\n    }\n  }\n": types.CreateArticleDocument,
    "\n  mutation DeleteArticle($articleId: ID!) {\n    deleteArticle(articleId: $articleId) {\n      success\n      message\n    }\n  }\n": types.DeleteArticleDocument,
    "\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      code\n      success\n      message\n      token\n      user {\n        id\n        email\n        username\n        bio\n      }\n    }\n  }\n": types.SignInDocument,
    "\n  mutation createUser($email: String!, $password: String!, $username: String!, $bio: String) {\n    createUser(email: $email, password: $password, username: $username, bio: $bio) {\n      code\n      success\n      message\n      user {\n        id\n        email\n        username\n        bio\n      }\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation CreateComment($authorId: ID!, $articleId: ID!, $content: String!) {\n    createComment(authorId: $authorId, articleId: $articleId, content: $content) {\n      code\n      success\n      message\n      comment {\n        id\n        content\n        createdAt\n      }\n    }\n  }\n": types.CreateCommentDocument,
    "\n  mutation DeleteComment($deleteCommentId: ID!) {\n    deleteComment(id: $deleteCommentId) {\n      code\n      success\n      message\n    }\n  }\n": types.DeleteCommentDocument,
    "\n  mutation UpdateComment($updateCommentId: ID!, $content: String!) {\n  updateComment(id: $updateCommentId, content: $content) {\n    code\n    success\n    message\n    comment {\n      id\n      content\n      authorId\n      articleId\n      createdAt\n      updatedAt\n    }\n  }\n}\n": types.UpdateCommentDocument,
    "\n  query GetUserById($userId: ID!) {\n    getUserById(userId: $userId) {\n      id\n      email\n      username\n      bio\n    }\n  }\n": types.GetUserByIdDocument,
    "\n  mutation Mutation($updateUserId: ID!, $username: String, $password: String, $bio: String) {\n    updateUser(id: $updateUserId, username: $username, password: $password, bio: $bio) {\n      code\n      success\n      message\n      user {\n        id\n        email\n        username\n        bio\n      }\n    }\n  }\n": types.MutationDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetArticleById($articleId: ID!) {\n    getArticleById(articleId: $articleId) {\n      author {\n        id\n        email\n        username\n        bio\n      }\n      authorId\n      comment {\n        articleId\n        author {\n          id\n          email\n          username\n          bio\n        }\n        authorId\n        content\n        createdAt\n        id\n        updatedAt\n      }\n      content\n      id\n      like {\n        user {\n          id\n          email\n          username\n          bio\n        }\n        id\n        createdAt\n        articleId\n        userId\n      }\n      published\n      title\n    }\n  }\n"): (typeof documents)["\n  query GetArticleById($articleId: ID!) {\n    getArticleById(articleId: $articleId) {\n      author {\n        id\n        email\n        username\n        bio\n      }\n      authorId\n      comment {\n        articleId\n        author {\n          id\n          email\n          username\n          bio\n        }\n        authorId\n        content\n        createdAt\n        id\n        updatedAt\n      }\n      content\n      id\n      like {\n        user {\n          id\n          email\n          username\n          bio\n        }\n        id\n        createdAt\n        articleId\n        userId\n      }\n      published\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetAllArticles {\n      getAllArticles {\n        author {\n          id\n          email\n          username\n          bio\n        }\n        authorId\n        content\n        id\n        published\n        title\n        like {\n          userId\n          id\n          createdAt\n          articleId\n        }\n      }\n    }\n"): (typeof documents)["\n    query GetAllArticles {\n      getAllArticles {\n        author {\n          id\n          email\n          username\n          bio\n        }\n        authorId\n        content\n        id\n        published\n        title\n        like {\n          userId\n          id\n          createdAt\n          articleId\n        }\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateArticle($title: String!, $content: String!) {\n    createArticle(title: $title, content: $content) {\n      code\n      success\n      message\n      article {\n        id\n        title\n        content\n        published\n        authorId\n        author {\n          id\n          email\n          username\n          bio\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateArticle($title: String!, $content: String!) {\n    createArticle(title: $title, content: $content) {\n      code\n      success\n      message\n      article {\n        id\n        title\n        content\n        published\n        authorId\n        author {\n          id\n          email\n          username\n          bio\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteArticle($articleId: ID!) {\n    deleteArticle(articleId: $articleId) {\n      success\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteArticle($articleId: ID!) {\n    deleteArticle(articleId: $articleId) {\n      success\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      code\n      success\n      message\n      token\n      user {\n        id\n        email\n        username\n        bio\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      code\n      success\n      message\n      token\n      user {\n        id\n        email\n        username\n        bio\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($email: String!, $password: String!, $username: String!, $bio: String) {\n    createUser(email: $email, password: $password, username: $username, bio: $bio) {\n      code\n      success\n      message\n      user {\n        id\n        email\n        username\n        bio\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($email: String!, $password: String!, $username: String!, $bio: String) {\n    createUser(email: $email, password: $password, username: $username, bio: $bio) {\n      code\n      success\n      message\n      user {\n        id\n        email\n        username\n        bio\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateComment($authorId: ID!, $articleId: ID!, $content: String!) {\n    createComment(authorId: $authorId, articleId: $articleId, content: $content) {\n      code\n      success\n      message\n      comment {\n        id\n        content\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateComment($authorId: ID!, $articleId: ID!, $content: String!) {\n    createComment(authorId: $authorId, articleId: $articleId, content: $content) {\n      code\n      success\n      message\n      comment {\n        id\n        content\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteComment($deleteCommentId: ID!) {\n    deleteComment(id: $deleteCommentId) {\n      code\n      success\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteComment($deleteCommentId: ID!) {\n    deleteComment(id: $deleteCommentId) {\n      code\n      success\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateComment($updateCommentId: ID!, $content: String!) {\n  updateComment(id: $updateCommentId, content: $content) {\n    code\n    success\n    message\n    comment {\n      id\n      content\n      authorId\n      articleId\n      createdAt\n      updatedAt\n    }\n  }\n}\n"): (typeof documents)["\n  mutation UpdateComment($updateCommentId: ID!, $content: String!) {\n  updateComment(id: $updateCommentId, content: $content) {\n    code\n    success\n    message\n    comment {\n      id\n      content\n      authorId\n      articleId\n      createdAt\n      updatedAt\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserById($userId: ID!) {\n    getUserById(userId: $userId) {\n      id\n      email\n      username\n      bio\n    }\n  }\n"): (typeof documents)["\n  query GetUserById($userId: ID!) {\n    getUserById(userId: $userId) {\n      id\n      email\n      username\n      bio\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Mutation($updateUserId: ID!, $username: String, $password: String, $bio: String) {\n    updateUser(id: $updateUserId, username: $username, password: $password, bio: $bio) {\n      code\n      success\n      message\n      user {\n        id\n        email\n        username\n        bio\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Mutation($updateUserId: ID!, $username: String, $password: String, $bio: String) {\n    updateUser(id: $updateUserId, username: $username, password: $password, bio: $bio) {\n      code\n      success\n      message\n      user {\n        id\n        email\n        username\n        bio\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;