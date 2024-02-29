import {Track} from "../types/Track";
import {openDatabase} from "../db/openDatabase";
import { selectFromDatabase } from "../db/selectFromDatabase";
import {Context} from "../Context";

export async function getAllTracks (
  _: any, __: any, context: Context
): Promise<Track[]|void> {
  const { dbFile } = context;
  const db = await openDatabase(dbFile)
  const result: Track[] = await selectFromDatabase(db, 'SELECT * from tracks');
  await db.close();
  return result;
}
