import express from "express";
import findServer, { Server } from "./findServer";

const app = express();

const port = 3008;

const servers: Server[] = [
  { url: `http://localhost:${port}/server1`, priority: 1 },
  { url: `http://localhost:${port}/server2`, priority: 2 },
  { url: `http://localhost:${port}/server3`, priority: 3 },
];

const serversInput: Server[] = [
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

app.get("/findServer", async (req, res) => {
  try {
    const server = await findServer(servers);
    res.json(server);
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
});

app.get("/findServerWithInput", async (req, res) => {
  try {
    const server = await findServer(serversInput);
    res.json(server);
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
