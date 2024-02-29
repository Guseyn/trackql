import { Database, OPEN_READWRITE } from "sqlite3";

export async function openDatabase(filename: string): Promise<Database> {
  return new Promise((resolve, reject) => {
    const db = new Database(filename, OPEN_READWRITE, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
}
