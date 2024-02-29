import { openDatabase } from "../db/openDatabase";
import { Track } from "../types/Track";
import { selectFromDatabase } from "../db/selectFromDatabase";
import { Context } from "../Context";

export async function getTrackById (
  _: any, args: { id: number }, context: Context
): Promise<Track|void> {
  const { dbFile } = context;
  const { id } = args;
  const db = await openDatabase(dbFile)
  const result: Track[] = await selectFromDatabase(db, `SELECT * from tracks WHERE id = ${id}`);
  await db.close();
  if (result.length > 0) {
    return  result[0]
  }
  throw new Error(`Track with ${id} Not Found`)
}
