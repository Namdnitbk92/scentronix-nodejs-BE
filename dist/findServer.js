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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
/**
 * Finds the first online server from the given list of servers.
 *
 * @param {Server[]} servers - The list of servers to search through.
 * @return {Promise<Server>} A Promise that resolves to the first online server.
 */
const findServer = (servers) => __awaiter(void 0, void 0, void 0, function* () {
    const requests = servers.map((server) => {
        return axios_1.default
            .get(server.url, { timeout: 5000 })
            .then((response) => {
            return {
                server,
                online: response.status >= 200 && response.status < 300,
            };
        })
            .catch((err) => ({ server, online: false }));
    });
    const results = yield Promise.all(requests);
    const onlineServers = results
        .filter((result) => !!result.online)
        .map((result) => result.server);
    if (onlineServers.length === 0) {
        return null;
    }
    onlineServers.sort((a, b) => a.priority - b.priority);
    return onlineServers[0];
});
exports.default = findServer;
