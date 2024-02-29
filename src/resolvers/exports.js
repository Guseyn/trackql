"use strict";
exports.__esModule = true;
exports.resolvers = void 0;
var getAllTracks_1 = require("./getAllTracks");
var createIfMissingAndGetTrackByNameAndArtistName_1 = require("./createIfMissingAndGetTrackByNameAndArtistName");
var getTrackById_1 = require("./getTrackById");
var deleteTrackById_1 = require("./deleteTrackById");
var updateTrackById_1 = require("./updateTrackById");
exports.resolvers = {
    Query: {
        allTracks: getAllTracks_1.getAllTracks,
        track: getTrackById_1.getTrackById
    },
    Mutation: {
        createIfMissingAndGetTrackByNameAndArtistName: createIfMissingAndGetTrackByNameAndArtistName_1.createIfMissingAndGetTrackByNameAndArtistName,
        deleteTrackById: deleteTrackById_1.deleteTrackById,
        updateTrackById: updateTrackById_1.updateTrackById
    }
};
