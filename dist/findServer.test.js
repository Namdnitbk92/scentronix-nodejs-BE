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
const findServer_1 = __importDefault(require("./findServer"));
const axios_1 = __importDefault(require("axios"));
jest.mock("axios");
const mockedAxios = axios_1.default;
describe("findServer", () => {
    const servers = [
        { url: "https://does-not-work.perfume.new", priority: 1 },
        { url: "https://gitlab.com", priority: 4 },
        { url: "http://app.scnt.me", priority: 3 },
        { url: "https://offline.scentronix.com", priority: 2 },
    ];
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should return the online server with the lowest priority", () => __awaiter(void 0, void 0, void 0, function* () {
        mockedAxios.get.mockImplementation((url) => {
            if (url === "https://gitlab.com") {
                return Promise.resolve({ status: 200 });
            }
            else if (url === "http://app.scnt.me") {
                return Promise.resolve({ status: 200 });
            }
            else {
                return Promise.reject(new Error("Network Error"));
            }
        });
        const server = yield (0, findServer_1.default)(servers);
        expect(server).toEqual({ url: "http://app.scnt.me", priority: 3 });
    }));
    it("should reject if no servers are online", () => __awaiter(void 0, void 0, void 0, function* () {
        mockedAxios.get.mockRejectedValue(new Error("Network Error"));
        yield expect((0, findServer_1.default)(servers)).rejects.toThrow("No servers are online");
    }));
    it("should timeout after 5 seconds", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.useFakeTimers();
        mockedAxios.get.mockImplementation(() => {
            return new Promise((resolve) => setTimeout(() => resolve({ status: 200 }), 6000));
        });
        const promise = (0, findServer_1.default)(servers);
        jest.runAllTimers();
        yield expect(promise).rejects.toThrow();
        jest.useRealTimers();
    }));
});
