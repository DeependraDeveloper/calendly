import express, { Express } from "express";

const app: Express = express();

import userRouter from "./routes/user.router.js";
import { errorHandler } from "./middlewares/error-handler.js";

app.use("/health", (_req, res) => {
  res.json({
    status: "ok",
    date: new Date().toISOString(),
  });

throw new Error("sdas")
});

// global middleware to deserialize json and urlencoded data to javascript objects. This is necessary for parsing incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);
app.use(errorHandler);

export { app };
