import {ApolloServer, AuthenticationError} from "apollo-server";
import {schema as typeDefs} from "./schema";
import {resolvers} from "./resolvers/exports";
import {Context} from "./Context";

const DB_FILE = './src/db/data/sqlite.db'

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }): Context => {
    const token = req.headers.authorization || '';
    if (!token) {
      throw new AuthenticationError('no token provided')
    }
    return { token, dbFile: DB_FILE }
  },
  formatError: (error) => {
    return error;
  },
});
