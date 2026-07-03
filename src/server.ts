import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { PORT } from "./config/env.js";

async function startServer() {
  await connectDB();

  app.listen(PORT, () => console.log(`server running on port : ${PORT}`));
}

startServer().catch((error) => {
  console.error("Error starting the server:", error);
  process.exit(1);
});
