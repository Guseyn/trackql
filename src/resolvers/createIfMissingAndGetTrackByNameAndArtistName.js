"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.createIfMissingAndGetTrackByNameAndArtistName = void 0;
var getTrackByNameAndArtistName_1 = require("../arc-cloud/getTrackByNameAndArtistName");
var formatDuration_1 = require("../lib/formatDuration");
var openDatabase_1 = require("../db/openDatabase");
var selectFromDatabase_1 = require("../db/selectFromDatabase");
var executeInDatabase_1 = require("../db/executeInDatabase");
function createIfMissingAndGetTrackByNameAndArtistName(_, args, context) {
    return __awaiter(this, void 0, void 0, function () {
        var name, artistName, token, dbFile, db, result, arcCloudResponse, first, track, insertedTrack;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = args.name, artistName = args.artistName;
                    token = context.token, dbFile = context.dbFile;
                    return [4 /*yield*/, (0, openDatabase_1.openDatabase)(dbFile)];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, (0, selectFromDatabase_1.selectFromDatabase)(db, "SELECT * from tracks WHERE name='".concat(name, "' AND artistName='").concat(artistName, "'"))];
                case 2:
                    result = _a.sent();
                    if (result.length > 0) {
                        db.close();
                        return [2 /*return*/, result[0]];
                    }
                    return [4 /*yield*/, (0, getTrackByNameAndArtistName_1.getTrackByNameAndArtistName)(name, artistName, token)];
                case 3:
                    arcCloudResponse = _a.sent();
                    if (!arcCloudResponse) return [3 /*break*/, 5];
                    first = arcCloudResponse[0];
                    track = {
                        duration: (0, formatDuration_1.formatDuration)(first.duration_ms),
                        name: first.name,
                        isrc: first.isrc,
                        artistName: first.artists[0].name,
                        releaseDate: first.album.release_date
                    };
                    return [4 /*yield*/, (0, executeInDatabase_1.executeInDatabase)(db, "\n                    INSERT INTO tracks(name, artistName, duration, isrc, releaseDate) \n                    VALUES ('".concat(track.name, "', '").concat(track.artistName, "', '").concat(track.duration, "', '").concat(track.isrc, "', '").concat(track.releaseDate, "')\n                "))];
                case 4:
                    insertedTrack = _a.sent();
                    db.close();
                    track.id = insertedTrack.lastID;
                    return [2 /*return*/, track];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createIfMissingAndGetTrackByNameAndArtistName = createIfMissingAndGetTrackByNameAndArtistName;
