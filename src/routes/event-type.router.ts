import { Router } from "express";
import {
  createEventType,
  deleteEventType,
  getAllEventTypes,
  getEventTypesByHostId,
  updateEventType,
} from "../controllers/event-type.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  createEventTypeSchema,
  updateEventTypeSchema,
} from "../dtos/event-type.dto.js";

const eventTypeRouter: Router = Router();

eventTypeRouter.get("/", getAllEventTypes);
eventTypeRouter.get("/:id", getEventTypesByHostId);
eventTypeRouter.post("/:id", validate(createEventTypeSchema), createEventType);
eventTypeRouter.patch("/:id", validate(updateEventTypeSchema), updateEventType);
eventTypeRouter.delete("/:id", deleteEventType);

export default eventTypeRouter;
