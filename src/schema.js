"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.SCHEMA = void 0;
var apollo_server_1 = require("apollo-server");
exports.SCHEMA = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type Track {\n        id: Int\n        name: String\n        artistName: String\n        duration: String\n        isrc: String\n        releaseDate: String\n    }\n\n    type ActionResponse {\n        status: String\n    }\n\n    type Query {\n        allTracks: [Track]\n        track(id: ID!): Track\n    }\n\n    type Mutation {\n        createIfMissingAndGetTrackByNameAndArtistName(name: String, artistName: String): Track!,\n        updateTrackById(id: ID, name: String, artistName: String): ActionResponse!,\n        deleteTrackById(id: ID): ActionResponse!,\n    }\n"], ["\n    type Track {\n        id: Int\n        name: String\n        artistName: String\n        duration: String\n        isrc: String\n        releaseDate: String\n    }\n\n    type ActionResponse {\n        status: String\n    }\n\n    type Query {\n        allTracks: [Track]\n        track(id: ID!): Track\n    }\n\n    type Mutation {\n        createIfMissingAndGetTrackByNameAndArtistName(name: String, artistName: String): Track!,\n        updateTrackById(id: ID, name: String, artistName: String): ActionResponse!,\n        deleteTrackById(id: ID): ActionResponse!,\n    }\n"])));
var templateObject_1;
