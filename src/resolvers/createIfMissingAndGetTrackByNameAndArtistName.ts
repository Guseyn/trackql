import { Track } from "../types/Track";
import { getTrackByNameAndArtistName } from "../arc-cloud/getTrackByNameAndArtistName";
import { Response } from "../arc-cloud/Response";
import { formatDuration } from "../lib/formatDuration";
import { openDatabase } from "../db/openDatabase";
import { selectFromDatabase } from "../db/selectFromDatabase";
import {executeInDatabase} from "../db/executeInDatabase";
import { Context } from "../Context";
import { RunResult } from "sqlite3";

export async function createIfMissingAndGetTrackByNameAndArtistName (
  _: any, args: { name: string, artistName: string }, context: Context
): Promise<Track|void> {
  const { name, artistName } = args;
  const { token, dbFile } = context;
  const db = await openDatabase(dbFile)
  const result: Track[] = await selectFromDatabase(db, `SELECT * from tracks WHERE name='${name}' AND artistName='${artistName}'`);
  if (result.length > 0) {
    db.close()
    return result[0]
  }
  const arcCloudResponse: Response[] =  await getTrackByNameAndArtistName(name, artistName, token)
  if (arcCloudResponse) {
    const first = arcCloudResponse[0];
    const track: Track = {
      duration: formatDuration(first.duration_ms),
      name: first.name,
      isrc: first.isrc,
      artistName: first.artists[0].name,
      releaseDate: first.album.release_date
    }
    const insertedTrack: RunResult = await executeInDatabase(
      db, `
        INSERT INTO
        tracks(name, artistName, duration, isrc, releaseDate)
        VALUES ('${track.name}', '${track.artistName}', '${track.duration}', '${track.isrc}', '${track.releaseDate}')
      `
    );
    db.close()
    track.id = insertedTrack.lastID;
    return track;
  }
}
