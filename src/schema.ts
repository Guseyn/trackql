import {gql} from "apollo-server";
import {DocumentNode} from "graphql/language";

export const SCHEMA: DocumentNode = gql`
    type Track {
        id: Int
        name: String
        artistName: String
        duration: String
        isrc: String
        releaseDate: String
    }

    type ActionResponse {
        status: String
    }

    type Query {
        allTracks: [Track]
        track(id: ID!): Track
    }

    type Mutation {
        createIfMissingAndGetTrackByNameAndArtistName(name: String, artistName: String): Track!,
        updateTrackById(id: ID, name: String, artistName: String): ActionResponse!,
        deleteTrackById(id: ID): ActionResponse!,
    }
`;
