import { getAllTracks } from "./getAllTracks";
import { createIfMissingAndGetTrackByNameAndArtistName } from "./createIfMissingAndGetTrackByNameAndArtistName";
import { getTrackById } from "./getTrackById";
import { deleteTrackById } from "./deleteTrackById";
import { updateTrackById } from "./updateTrackById";

export const resolvers = {
  Query: {
    allTracks: getAllTracks,
    track:  getTrackById
  },
  Mutation: {
    createIfMissingAndGetTrackByNameAndArtistName,
    deleteTrackById,
    updateTrackById
  }
}
