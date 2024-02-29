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
var server_1 = require("./server");
var createSQLSchema_1 = require("./db/createSQLSchema");
var DB_FILE = './src/db/data/sqlite.db';
var DB_SCHEMA_FILE = './src/db/sql/schema.sql';
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var serverInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, createSQLSchema_1.createSQLSchema)(DB_FILE, DB_SCHEMA_FILE)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, server_1.server.listen()];
                case 2:
                    serverInfo = _a.sent();
                    console.log("\uD83D\uDE80 Server ready at ".concat(serverInfo.url, " for tests"));
                    return [2 /*return*/];
            }
        });
    });
})();
// describe('GraphQL API', () => {
//     let createdTrackId; // To store the ID of the track created for cleanup
//
//     it('should create a track, query all tracks, and then delete the created track', async () => {
//         // Mutation to create the track
//         const createMutation = `
//       mutation CreateAndGet {
//         createIfMissingAndGetTrackByNameAndArtistName(
//           name: "Donna Diaspora", artistName: "Shantel"
//         ) {
//           id
//         }
//       }
//     `;
//
//         // Execute mutation to create the track
//         const createResponse = await request(app)
//             .post('http://localhost:4000/')
//             .send({ query: createMutation })
//             .expect(200);
//
//         // Extract the ID of the created track
//         createdTrackId = createResponse.body.data.createIfMissingAndGetTrackByNameAndArtistName.id;
//
//         // Query all tracks
//         const query = `
//       query {
//         allTracks {
//           id
//           name
//           artistName
//           duration
//           releaseDate
//           isrc
//         }
//       }
//     `;
//
//         // Execute query to retrieve all tracks
//         const queryResponse = await request(app)
//             .post('http://localhost:4000/')
//             .send({ query })
//             .expect(200);
//
//         // Assert that the query response contains the expected data
//         expect(queryResponse.body).toHaveProperty('data.allTracks');
//         expect(Array.isArray(queryResponse.body.data.allTracks)).toBe(true);
//
//         // Assuming tracks are returned in the response
//         const track = queryResponse.body.data.allTracks[0];
//         expect(track).toHaveProperty('id');
//         expect(track).toHaveProperty('name');
//         expect(track).toHaveProperty('artistName');
//         expect(track).toHaveProperty('duration');
//         expect(track).toHaveProperty('releaseDate');
//         expect(track).toHaveProperty('isrc');
//
//         // Mutation to delete the created track
//         const deleteMutation = `
//       mutation DeleteTrackById {
//         deleteTrackById(id: ${createdTrackId}) {
//           status
//         }
//       }
//     `;
//         // Execute mutation to delete the track
//         await request(app)
//             .post('http://localhost:4000/')
//             .send({ query: deleteMutation })
//             .expect(200);
//     });
// });
