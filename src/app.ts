import express, { Express } from "express";

const app: Express = express();

import { errorHandler } from "./middlewares/error-handler.js";
import { routeNotFound } from "./middlewares/route-handler.js";

import userRouter from "./routes/user.router.js";
import eventTypeRouter from "./routes/event-type.router.js";
import publicEventRouter  from "./routes/public-event.router.js";
import availabilityRouter from "./routes/availability.router.js";
import bookingRouter from "./routes/booking.router.js";

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
app.use('/api/v1/event-types', eventTypeRouter);
app.use('/api/v1/public', publicEventRouter);
app.use('/api/v1/availability', availabilityRouter);
app.use('/api/v1/bookings', bookingRouter);

// route  middleware
app.use(routeNotFound);

// error middleware
app.use(errorHandler);

export { app };
