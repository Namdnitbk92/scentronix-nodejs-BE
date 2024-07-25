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
const express_1 = __importDefault(require("express"));
const findServer_1 = __importDefault(require("./findServer"));
const app = (0, express_1.default)();
const port = 3008;
const servers = [
    { url: `http://localhost:${port}/server1`, priority: 1 },
    { url: `http://localhost:${port}/server2`, priority: 2 },
    { url: `http://localhost:${port}/server3`, priority: 3 },
];
const serversInput = [
    { url: "https://does-not-work.perfume.new", priority: 1 },
    { url: "https://gitlab.com", priority: 4 },
    { url: "http://app.scnt.me", priority: 3 },
    { url: "https://offline.scentronix.com", priority: 2 },
];
app.get("/server1", (req, res) => {
    res.status(200).send("Server 1 is online");
});
app.get("/server2", (req, res) => {
    res.status(500).send("Server 2 is offline");
});
app.get("/server3", (req, res) => {
    res.status(200).send("Server 3 is online");
});
app.get("/findServer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const server = yield (0, findServer_1.default)(servers);
        res.json(server);
    }
    catch (err) {
        res.status(500).json({
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
}));
app.get("/findServerWithInput", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const server = yield (0, findServer_1.default)(serversInput);
        res.json(server);
    }
    catch (err) {
        res.status(500).json({
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
