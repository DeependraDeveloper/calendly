import { Router } from "express";
import {
  createException,
  createRule,
  listExceptions,
  listRules,
  removeException,
  removeRule,
  updateException,
  updateRule,
} from "../controllers/availability.controller.js";
import {
  createAvailabilityExceptionSchema,
  createAvailabilityRuleSchema,
  updateAvailabilityExceptionSchema,
  updateAvailabilityRuleSchema,
} from "../dtos/availability.dto.js";
import { userAuth } from "../middlewares/user-auth.js";
import { validate } from "../middlewares/validate.js";
const availabilityRouter: Router = Router();

availabilityRouter.use(userAuth);

availabilityRouter.get("/rules", listRules);
availabilityRouter.post(
  "/rules",
  validate(createAvailabilityRuleSchema),
  createRule,
);
availabilityRouter.patch(
  "/rules/:id",
  validate(updateAvailabilityRuleSchema),
  updateRule,
);
availabilityRouter.delete("/rules/:id", removeRule);

availabilityRouter.get("/exceptions", listExceptions);
availabilityRouter.post(
  "/exceptions",
  validate(createAvailabilityExceptionSchema),
  createException,
);
availabilityRouter.patch(
  "/exceptions/:id",
  validate(updateAvailabilityExceptionSchema),
  updateException,
);
availabilityRouter.delete("/exceptions/:id", removeException);

export default availabilityRouter;
