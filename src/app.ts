import { createSQLSchema } from "./db/createSQLSchema";
import { server } from "./server";

const DB_FILE = './src/db/data/sqlite.db';
const DB_SCHEMA_FILE = './src/db/sql/schema.sql';

(async function () {
  await createSQLSchema(DB_FILE, DB_SCHEMA_FILE)
  const serverInfo = await server.listen()
  console.log(`🚀 GraphQL Server ready at ${serverInfo.url}`);
})()
