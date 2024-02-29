import {Database, RunResult} from "sqlite3";

export async function executeInDatabase(db: Database, query: string) {
  return new Promise<RunResult>((resolve, reject) => {
    db.run(query, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}
