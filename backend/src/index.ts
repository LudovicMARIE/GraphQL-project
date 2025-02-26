import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { getUser } from './modules/auth.js';
import db from './datasources/db.js'
import "dotenv/config";
import { resolvers } from './resolvers/resolvers.js';


const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers,
});
 
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({req}) => {
    const cache = server.cache
    // console.log("Headers reçus:", req.headers);
    const token = (req.headers.authorization)?.split('Bearer ')?.[1]
    // console.log("Token extrait:", token);
    const user = token ? getUser(token) : null;
    // console.log("Utilisateur récupéré:", user);
    return {
      dataSources: {
        db
      },
      user,
    }
  }
});
 
console.log(`🚀  Server ready at: ${url}`);
