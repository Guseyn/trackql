"use strict";
exports.__esModule = true;
exports.server = void 0;
var apollo_server_1 = require("apollo-server");
var schema_1 = require("./schema");
var exports_1 = require("./resolvers/exports");
var DB_FILE = './src/db/data/sqlite.db';
exports.server = new apollo_server_1.ApolloServer({
    typeDefs: schema_1.SCHEMA,
    resolvers: exports_1.resolvers,
    context: function (_a) {
        var req = _a.req;
        var token = req.headers.authorization || '';
        if (!token) {
            throw new apollo_server_1.AuthenticationError('no token provided');
        }
        return { token: token, dbFile: DB_FILE };
    },
    formatError: function (error) {
        return error;
    }
});
