import { promises as fsPromises } from "fs";
import { openDatabase } from "./openDatabase";
import { executeInDatabase } from "./executeInDatabase";

export async function createSQLSchema (dbFile: string, dbSchemaFile: string) {
  try {
    const db = await openDatabase(dbFile)
    const createTablesQuery = await fsPromises.readFile(dbSchemaFile, 'utf-8')
    await executeInDatabase(db, createTablesQuery);
    await db.close();
    console.log('Tables created successfully');
  } catch (error: any) {
    console.error('Error creating tables:', error.message);
  }
}
