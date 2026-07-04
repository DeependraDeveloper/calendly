import { Router } from "express";
import {
  createEventType,
  deleteEventType,
  getAllEventTypes,
  getEventTypesByHostId,
  getEventTypesByHostIdAndSlug,
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
eventTypeRouter.get("/:id/:slug", getEventTypesByHostIdAndSlug);
eventTypeRouter.post("/:id", validate(createEventTypeSchema), createEventType);
eventTypeRouter.patch("/:id", validate(updateEventTypeSchema), updateEventType);
eventTypeRouter.delete("/:hostId/:id", deleteEventType);

export default eventTypeRouter;
