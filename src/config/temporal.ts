import { Connection, Client } from "@temporalio/client";
import { TEMPORAL_ADDRESS, TEMPORAL_NAMESPACE } from "./env.js";

let client: Client | null = null;

// single ton
export async function getTemporalClient() {
  if (client) return client;

  client = new Client({
    connection: await Connection.connect({
      address: TEMPORAL_ADDRESS,
    }),
    namespace: TEMPORAL_NAMESPACE,
  });

  return client;
}

export async function disconnectTemporal() {
  if (client) {
    await client.connection.close();
    client = null;
  }
}
