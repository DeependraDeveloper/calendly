import { Connection, Client } from "@temporalio/client";
import { TEMPORAL_ADDRESS, TEMPORAL_NAMESPACE } from "./env.js";

let client: Client | null = null;
let temporalEnabled = false;

export async function getTemporalClient(): Promise<Client | null> {
  if (client) return client;

  try {
    const connection = await Connection.connect({
      address: TEMPORAL_ADDRESS,
    });

    client = new Client({
      connection,
      namespace: TEMPORAL_NAMESPACE,
    });

    temporalEnabled = true;

    console.log("Connected to the temporal successfully.");

    return client;
  } catch (error) {
    temporalEnabled = false;

    console.error("Unable to connect to Temporal:", error);

    return null;
  }
}

export async function disconnectTemporal() {
  if (client) {
    await client.connection.close();
    client = null;
  }

  temporalEnabled = false;
}


export function getTemporalEnabled() {
    return temporalEnabled;
}