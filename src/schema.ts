import { readFileSync } from 'fs';
import { buildSchema } from 'graphql';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

const schemaFilePath = './src/graphql/schema.graphql';

const schemaString = readFileSync(schemaFilePath, 'utf8');

const loadedSchema = loadSchemaSync(schemaFilePath, {
  loaders: [new GraphQLFileLoader()],
});

export const SCHEMA = buildSchema(schemaString)
