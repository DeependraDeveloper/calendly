import { Request, Response } from "express";
import {
  addEventType,
  findEventTypesByHostId,
  getEventTypeById,
  getEventTypePublic,
  modifyEventType,
  removeEventType,
} from "../services/event-type.service.js";
import { sendSuccess } from "../utilities/api-response.js";

export const getAllEventTypes = async (req: Request, res: Response) => {
  const data = await findEventTypesByHostId(req.userId);
  sendSuccess(res, data, 200, "EventTypes fetched successfully");
};

export const getEventTypesByHostId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await getEventTypeById(Number(id), req.userId);
  sendSuccess(res, data, 200, "Host EventTypes fetched successfully");
};

export const createEventType = async (req: Request, res: Response) => {
  const eventType = req.body;
  const data = await addEventType(req.userId, eventType);
  sendSuccess(res, data, 201, "EventTypes created successfully");
};

export const updateEventType = async (req: Request, res: Response) => {
  const { id } = req.params;
  const eventTypeDta = req.body;
  const data = await modifyEventType(req.userId, Number(id), eventTypeDta);
  sendSuccess(res, data, 200, "EventType updated successfully");
};

export const deleteEventType = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await removeEventType(req.userId, Number(id));
  sendSuccess(res, data, 200, "EventType deleted successfully");
};

export const getEventTypesByHostIdAndSlug = async (
  req: Request,
  res: Response,
) => {
  const { userId, slug } = req.params;
  const data = await getEventTypePublic(Number(userId), String(slug));
  sendSuccess(res, data, 200, "Host EventTypes fetched successfully");
};
