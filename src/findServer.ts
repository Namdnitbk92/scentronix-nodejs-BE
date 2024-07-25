import axios from "axios";

export interface Server {
  url: string;
  priority: number;
}

/**
 * Finds the first online server from the given list of servers.
 *
 * @param {Server[]} servers - The list of servers to search through.
 * @return {Promise<Server>} A Promise that resolves to the first online server.
 */
const findServer = async (servers: Server[]): Promise<Server | null> => {
  const requests = servers.map((server) => {
    return axios
      .get(server.url, { timeout: 5000 })
      .then((response) => {
        return {
          server,
          online: response.status >= 200 && response.status < 300,
        };
      })
      .catch((err) => ({ server, online: false }));
  });

  const results = await Promise.all(requests);
  const onlineServers = results
    .filter((result) => !!result.online)
    .map((result) => result.server);

  if (onlineServers.length === 0) {
    return null;
  }

  onlineServers.sort((a, b) => a.priority - b.priority);

  return onlineServers[0];
};

export default findServer;
