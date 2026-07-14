import { Router } from "express";
import { create, list } from "../controllers/booking.controller.js";
import { createBookingSchema, listHostBookingsQuerySchema } from "../dtos/booking.dto.js";
import { userAuth } from "../middlewares/user-auth.js";
import { validate, validateQuery } from "../middlewares/validate.js";

const bookingRouter: Router = Router();

bookingRouter.use(userAuth);

bookingRouter.get("/", validateQuery(listHostBookingsQuerySchema), list);
bookingRouter.post("/", validate(createBookingSchema), create);

export default bookingRouter;