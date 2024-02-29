import {Database} from "sqlite3";

export async function selectFromDatabase(db: Database, query: string): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
        db.all(query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
