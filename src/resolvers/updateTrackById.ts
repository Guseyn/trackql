import { openDatabase } from "../db/openDatabase";
import { RunResult } from "sqlite3";
import { executeInDatabase } from "../db/executeInDatabase";
import { Context } from "../Context";

export async function updateTrackById (
  _: any,
  args: { id: number, name: string, artistName: string },
  context: Context
) {
  const { dbFile } = context;
  const { id, name, artistName } = args;

  const db = await openDatabase(dbFile)
  const updatedTrack: RunResult = await executeInDatabase(
    db, `UPDATE tracks SET name='${name}', artistName='${artistName}' WHERE id=${id}`
  );
  db.close()
  if (updatedTrack.changes > 0) {
    return {
      status: `Track with id ${id} Updated with new name=${name} and artistName=${artistName}`
    }
  }
  throw new Error(`Track with ${id} Not Found`)
}
