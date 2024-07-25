import { exit } from "process";
import findServer, { Server } from "./findServer";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("findServer", () => {
  const servers: Server[] = [
    { url: "https://does-not-work.perfume.new", priority: 1 },
    { url: "https://gitlab.com", priority: 4 },
    { url: "http://app.scnt.me", priority: 3 },
    { url: "https://offline.scentronix.com", priority: 2 },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the online server with the lowest priority", async () => {
    mockedAxios.get.mockImplementation((url) => {
      if (url === "https://gitlab.com") {
        return Promise.resolve({ status: 200 });
      } else if (url === "http://app.scnt.me") {
        return Promise.resolve({ status: 200 });
      } else {
        return Promise.reject(new Error("Network Error"));
      }
    });

    const server = await findServer(servers);
    expect(server).toEqual({ url: "http://app.scnt.me", priority: 3 });
  });

  it("should reject if no servers are online", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network Error"));

    await expect(findServer(servers)).rejects.toThrow("No servers are online");
  });

  it("should timeout after 5 seconds", async () => {
    jest.useFakeTimers();
    mockedAxios.get.mockImplementation(() => {
      return new Promise((resolve) =>
        setTimeout(() => resolve({ status: 200 }), 6000)
      );
    });

    const promise = findServer(servers);
    jest.runAllTimers();

    await expect(promise).rejects.toThrow();
    jest.useRealTimers();
  });
});
