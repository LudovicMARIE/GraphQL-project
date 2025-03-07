import {CodegenConfig} from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: './src/schema.ts',
  generates: {
    './src/types.ts': {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: './context/context#Context',
        mappers: {
          User: './models/models#AuthorModel',
          Article: './models/models#ArticleModel',
          Comment: './models/models#CommentModel',
          Like: './models/models#LikeModel'
        }
      }
    }
  }
}
 
export default config