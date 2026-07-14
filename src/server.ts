import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { PORT } from "./config/env.js";
import { getTemporalClient, getTemporalEnabled } from "./config/temporal.js";

async function startServer() {
  await connectDB();
  await getTemporalClient();
  app.listen(PORT, () => console.log(`server running on port : ${PORT} , [TEMPORAL] ${getTemporalEnabled()}`));
}

startServer().catch((error) => {
  console.error("Error starting the server:", error);
  process.exit(1);
});
