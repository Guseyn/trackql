import axios from "axios"
import { Response } from "./Response";

export async function getTrackByNameAndArtistName(
  name: string, artistName: string, token: string
): Promise<Response[]> {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://eu-api-v2.acrcloud.com/api/external-metadata/tracks',
    params: {
      query: JSON.stringify({'track': name, 'artists': [artistName]}),
      format: 'json'
    },
    headers: {
      'Authorization': token
    }
  };
  const res = await axios.request(config);
  return res.data.data;
}
