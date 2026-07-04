import { Request, Response } from "express";
import {
  addEventType,
  findAllEventTypes,
  findEventTypesByHostId,
  modifyEventType,
  removeEventType,
} from "../services/event-type.service.js";
import { sendSuccess } from "../utilities/api-response.js";

export const getAllEventTypes = async (_req: Request, res: Response) => {
  const data = await findAllEventTypes();
  sendSuccess(res, data, 200, "EventTypes fetched successfully");
};

export const createEventType = async (req: Request, res: Response) => {
  const eventType = req.body;
  const {id} = req.params;
  const data = await addEventType(Number(id),eventType);
  sendSuccess(res, data, 201, "EventTypes created successfully");
};

export const getEventTypesByHostId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await findEventTypesByHostId(Number(id));
  sendSuccess(res, data, 200, "Host EventTypes fetched successfully");
};

export const updateEventType = async (req: Request, res: Response) => {
  const { id } = req.params;
  const eventTypeDta = req.body;
  const data = await modifyEventType(Number(id), eventTypeDta);
  sendSuccess(res, data, 200, "EventType updated successfully");
};

export const deleteEventType = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await removeEventType(Number(id));
  sendSuccess(res, data, 200, "EventType deleted successfully");
};
