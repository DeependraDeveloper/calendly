import { Router } from "express";
import {
  createEventType,
  deleteEventType,
  getAllEventTypes,
  getEventTypesByHostId,
  updateEventType,
} from "../controllers/eventType.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  createEventTypeSchema,
  updateEventTypeSchema,
} from "../dtos/eventType.dto.js";

const eventTypeRouter: Router = Router();

eventTypeRouter.get("/", getAllEventTypes);
eventTypeRouter.get("/:id", getEventTypesByHostId);
eventTypeRouter.post("/", validate(createEventTypeSchema), createEventType);
eventTypeRouter.patch("/:id", validate(updateEventTypeSchema), updateEventType);
eventTypeRouter.delete("/:id", deleteEventType);

export default eventTypeRouter;
