import { GraphQLResolveInfo } from 'graphql';
import { AuthorModel, ArticleModel } from './models';
import { Context } from './context/context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Article = {
  __typename?: 'Article';
  author: Array<Maybe<User>>;
  authorId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  published: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};

export type CreateArticleResponse = {
  __typename?: 'CreateArticleResponse';
  article?: Maybe<Article>;
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type DeleteArticleResponse = {
  __typename?: 'DeleteArticleResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Like = {
  __typename?: 'Like';
  article: Scalars['String']['output'];
  articleId: Scalars['ID']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type LikeToggleResponse = {
  __typename?: 'LikeToggleResponse';
  code: Scalars['Int']['output'];
  like?: Maybe<Like>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createArticle: CreateArticleResponse;
  createLike: Like;
  createUser?: Maybe<CreateUserResponse>;
  deleteArticle: DeleteArticleResponse;
  deleteLike: Scalars['Boolean']['output'];
  signIn?: Maybe<SignInResponse>;
  updateArticle: UpdateArticleResponse;
};


export type MutationCreateArticleArgs = {
  content: Scalars['String']['input'];
  published?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
  toggleLike: LikeToggleResponse;
  unlikeArticle: Scalars['Boolean']['output'];
};


export type MutationCreateLikeArgs = {
  articleId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreateUserArgs = {
  bio?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteArticleArgs = {
  articleId: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateArticleArgs = {
  articleId: Scalars['ID']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationToggleLikeArgs = {
  articleId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationUnlikeArticleArgs = {
  articleId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllArticles: Array<Article>;
  getArticlesByUserId: Array<Article>;
  hasUserLiked: Scalars['Boolean']['output'];
  like?: Maybe<Like>;
  likeCount: Scalars['Int']['output'];
  likes: Array<Like>;
  likesByArticle: Array<Like>;
  likesByUser: Array<Like>;
};


export type QueryHasUserLikedArgs = {
  articleId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type QueryLikeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLikeCountArgs = {
  articleId: Scalars['ID']['input'];
};


export type QueryGetArticlesByUserIdArgs = {
  userId: Scalars['ID']['input'];
export type QueryLikesByArticleArgs = {
  articleId: Scalars['ID']['input'];
};


export type QueryLikesByUserArgs = {
  userId: Scalars['ID']['input'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
};

export type UpdateArticleResponse = {
  __typename?: 'UpdateArticleResponse';
  article?: Maybe<Article>;
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Article: ResolverTypeWrapper<ArticleModel>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateArticleResponse: ResolverTypeWrapper<Omit<CreateArticleResponse, 'article'> & { article?: Maybe<ResolversTypes['Article']> }>;
  CreateUserResponse: ResolverTypeWrapper<Omit<CreateUserResponse, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  DeleteArticleResponse: ResolverTypeWrapper<DeleteArticleResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Like: ResolverTypeWrapper<Like>;
  LikeToggleResponse: ResolverTypeWrapper<LikeToggleResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SignInResponse: ResolverTypeWrapper<SignInResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateArticleResponse: ResolverTypeWrapper<Omit<UpdateArticleResponse, 'article'> & { article?: Maybe<ResolversTypes['Article']> }>;
  User: ResolverTypeWrapper<AuthorModel>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Article: ArticleModel;
  Boolean: Scalars['Boolean']['output'];
  CreateArticleResponse: Omit<CreateArticleResponse, 'article'> & { article?: Maybe<ResolversParentTypes['Article']> };
  CreateUserResponse: Omit<CreateUserResponse, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  DeleteArticleResponse: DeleteArticleResponse;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Like: Like;
  LikeToggleResponse: LikeToggleResponse;
  Mutation: {};
  Query: {};
  SignInResponse: SignInResponse;
  String: Scalars['String']['output'];
  UpdateArticleResponse: Omit<UpdateArticleResponse, 'article'> & { article?: Maybe<ResolversParentTypes['Article']> };
  User: AuthorModel;
};

export type ArticleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']> = {
  author?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  published?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateArticleResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateArticleResponse'] = ResolversParentTypes['CreateArticleResponse']> = {
  article?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateUserResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateUserResponse'] = ResolversParentTypes['CreateUserResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteArticleResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DeleteArticleResponse'] = ResolversParentTypes['DeleteArticleResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']> = {
  article?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  articleId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeToggleResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LikeToggleResponse'] = ResolversParentTypes['LikeToggleResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  like?: Resolver<Maybe<ResolversTypes['Like']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createArticle?: Resolver<ResolversTypes['CreateArticleResponse'], ParentType, ContextType, RequireFields<MutationCreateArticleArgs, 'content' | 'title'>>;
  createLike?: Resolver<ResolversTypes['Like'], ParentType, ContextType, RequireFields<MutationCreateLikeArgs, 'articleId' | 'userId'>>;
  createUser?: Resolver<Maybe<ResolversTypes['CreateUserResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'password' | 'username'>>;
  deleteArticle?: Resolver<ResolversTypes['DeleteArticleResponse'], ParentType, ContextType, RequireFields<MutationDeleteArticleArgs, 'articleId'>>;
  deleteLike?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteLikeArgs, 'id'>>;
  signIn?: Resolver<Maybe<ResolversTypes['SignInResponse']>, ParentType, ContextType, RequireFields<MutationSignInArgs, 'email' | 'password'>>;
  updateArticle?: Resolver<ResolversTypes['UpdateArticleResponse'], ParentType, ContextType, RequireFields<MutationUpdateArticleArgs, 'articleId'>>;
  toggleLike?: Resolver<ResolversTypes['LikeToggleResponse'], ParentType, ContextType, RequireFields<MutationToggleLikeArgs, 'articleId' | 'userId'>>;
  unlikeArticle?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUnlikeArticleArgs, 'articleId' | 'userId'>>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  hasUserLiked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryHasUserLikedArgs, 'articleId' | 'userId'>>;
  like?: Resolver<Maybe<ResolversTypes['Like']>, ParentType, ContextType, RequireFields<QueryLikeArgs, 'id'>>;
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<QueryLikeCountArgs, 'articleId'>>;
  likes?: Resolver<Array<ResolversTypes['Like']>, ParentType, ContextType>;
  likesByArticle?: Resolver<Array<ResolversTypes['Like']>, ParentType, ContextType, RequireFields<QueryLikesByArticleArgs, 'articleId'>>;
  likesByUser?: Resolver<Array<ResolversTypes['Like']>, ParentType, ContextType, RequireFields<QueryLikesByUserArgs, 'userId'>>;
  getAllArticles?: Resolver<Array<ResolversTypes['Article']>, ParentType, ContextType>;
  getArticlesByUserId?: Resolver<Array<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<QueryGetArticlesByUserIdArgs, 'userId'>>;
};

export type SignInResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SignInResponse'] = ResolversParentTypes['SignInResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateArticleResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UpdateArticleResponse'] = ResolversParentTypes['UpdateArticleResponse']> = {
  article?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Article?: ArticleResolvers<ContextType>;
  CreateArticleResponse?: CreateArticleResponseResolvers<ContextType>;
  CreateUserResponse?: CreateUserResponseResolvers<ContextType>;
  DeleteArticleResponse?: DeleteArticleResponseResolvers<ContextType>;
  Like?: LikeResolvers<ContextType>;
  LikeToggleResponse?: LikeToggleResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignInResponse?: SignInResponseResolvers<ContextType>;
  UpdateArticleResponse?: UpdateArticleResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

