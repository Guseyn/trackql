import {Context} from "../Context";
import {openDatabase} from "../db/openDatabase";
import {RunResult} from "sqlite3";
import {executeInDatabase} from "../db/executeInDatabase";

export async function deleteTrackById (
  _: any, args: { id: number }, context: Context
): Promise<{ status: string }|void> {
  const { dbFile } = context;
  const { id } = args;

  const db = await openDatabase(dbFile)
  const deletedTrack: RunResult = await executeInDatabase(
    db, `DELETE from tracks WHERE id='${id}'`
  );
  db.close()
  if (deletedTrack.changes > 0) {
    return {
      status: `Track with id ${id} Deleted`
    }
  }
  throw new Error(`Track with ${id} Not Found`)
}
