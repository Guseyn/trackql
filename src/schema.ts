import { readFileSync } from 'fs';
import { buildSchema } from 'graphql';

const schemaFilePath = './src/graphql/schema.graphql';

const schemaString = readFileSync(schemaFilePath, 'utf8');

export const schema = buildSchema(schemaString)
