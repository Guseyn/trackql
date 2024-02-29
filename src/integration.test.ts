import { server } from "./server";
import { createSQLSchema } from "./db/createSQLSchema";
import axios, { AxiosResponse } from "axios";
import assert from "assert";

const DB_FILE = './src/db/data/sqlite.db';
const DB_SCHEMA_FILE = './src/db/sql/schema.sql';
const TOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiMDc1NTM4NTVmNDhhNjk5MTIwNGM3YTZkMWE3YjE0YmY0NDVkOTMzNzVhYjQwODRmZjYwYjFhNjA3OGEzZWI1ZjY4NGZkNjgzZTIzYTNjY2IiLCJpYXQiOjE3MDkxNjE5NjkuNzQzMzY1LCJuYmYiOjE3MDkxNjE5NjkuNzQzMzY4LCJleHAiOjIwMjQ3ODExNjkuNzAxNDc1LCJzdWIiOiIxNzI0OTUiLCJzY29wZXMiOlsicmVhZC1hbGwiXX0.YOOv2Jm0z5NC8SsTBWGOMqZQ-KFYnyLCTfMYrsd8vPFEPeng5CsyjtrsOBnx1O9JbwYlUGNGQqrCmbrZBBam08HFGzDsPuuRm0WuHHHe_sWHfEwcP_zjkJ0yx1aDWkI8lQtRm5A24EwkPK-YWxyfFtwxaF1noeRrtYen35ncemLgXg2FyLA6kIAyRW-3obyWUEi5YuYzJf4mj9mY6ibsKwu-t-FD6P7ZLKJ-k9rRCygocd89-ZDw0hFU2G7MD8S_9vRgB_ROfiIPl_56fB-yQzKVbzOfp48GtpjGuoHDo2P_t46Y52Dv2_sMdA6tgJYkb_G0CsY-iPDao7d_SZHsjY_TbqQgGHEpQSuBp9Ok2DbSCSOAvzjsm_fETOOsSK8--6qF68bDEyeWIFMGGJRppDF3UBhT9VQFNJlla9lyHDzljeE3pCFQ2FJQR95GN2d_3-qEJ5itodz00g4u5IRdwK0UOO1Co5YsINF0Lnqkr87KIGulghgG71xR4FrBykgXrNljN0hRI_-D4iTXJRyRhoe7mt5ZK3sERFetOkKB9iUmTDBMR_d6BMmStJotk-_HnkHecVGLvi27degZp4EZndTSVaCSWsWpT9RA3UJFw9zCvgHW8m-NxHiFbiQQZwH1S3sT7d6umnvh6E2MlEqFhO6aJ0dT5g3w2_1lTRPLiJo';

async function runQuery (query: string, token: string): Promise<any> {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:4000/',
    data: {
      query: query
    },
    headers: {
      'Authorization': token
    }
  };
  const responseWithData: AxiosResponse = await axios.request(config);
  return responseWithData.data.data;
}

(async function () {
  await createSQLSchema(DB_FILE, DB_SCHEMA_FILE)
  const serverInfo = await server.listen()
  console.log(`🚀 Server ready at ${serverInfo.url} for tests`);

  const createMutation = `
      mutation CreateAndGet {
        createIfMissingAndGetTrackByNameAndArtistName(
          name: "Donna Diaspora", artistName: "Shantel"
        ) {
          id
        }
      }
    `;
  const createdTrack = await runQuery(createMutation, TOKEN);
  const createdTrackId = createdTrack.createIfMissingAndGetTrackByNameAndArtistName.id;

  assert.ok(createdTrackId >= 0);
  console.log('✅︎ creation passed')

  const allTracksQuery = `
      query {
        allTracks {
          id
          name
          artistName
          duration
          releaseDate
          isrc
        }
      }
    `;
  const allTracks = await runQuery(allTracksQuery, TOKEN);

  assert.ok(allTracks.allTracks.length > 0);
  console.log('✅︎ getting all tracks passed');

  const deletingQuery = `
      mutation DeleteTrackById {
        deleteTrackById(id: ${createdTrackId}) {
          status
        }
      }
    `;
  const deletedTrack = await runQuery(deletingQuery, TOKEN);
  assert.ok(deletedTrack.deleteTrackById.status === `Track with id ${createdTrackId} Deleted`);
  console.log('✅︎ deleting the track passed');

  console.log('✅︎ all tests passed');
  process.exit(0);
})()
