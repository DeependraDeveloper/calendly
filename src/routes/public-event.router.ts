import { Router } from "express";
import { getEventTypesByHostIdAndSlug } from "../controllers/event-type.controller.js";

const publicEventRouter: Router = Router();

publicEventRouter.get(
  "/users/:userId/event-types/:slug",
  getEventTypesByHostIdAndSlug,
);

export default publicEventRouter;
