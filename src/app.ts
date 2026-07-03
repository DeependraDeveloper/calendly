import express, { Express } from "express";

const app: Express = express();

import userRouter from "./routes/user.router.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { routeNotFound } from "./middlewares/route-handler.js";

app.use("/health", (_req, res) => {
  res.json({
    status: "ok",
    date: new Date().toISOString(),
  });
});

// global middleware to deserialize json and urlencoded data to javascript objects. This is necessary for parsing incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/users", userRouter);

// route  middleware
app.use(routeNotFound);

// error middleware
app.use(errorHandler);

export { app };
