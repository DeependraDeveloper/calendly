import {
  CreateEventTypeDto,
  UpdateEventTypeDto,
} from "../dtos/eventType.dto.js";
import {
  findAll,
  findByHostId,
  findEventTypeById,
  insert,
  remove,
  update,
} from "../repositories/eventType.repository.js";
import { findOne } from "../repositories/user.repository.js";
import { conflict } from "../utilities/api-error.js";

export const findAllEventTypes = async () => {
  const event_types = await findAll();
  return event_types;
};

export const findEventTypesByHostId = async (hostId: number) => {
  const isHostExist = await findOne(hostId);
  if (!isHostExist) throw conflict("Host not found");

  const data = await findByHostId(hostId);

  return data;
};

export const addEventType = async (eventDetials: CreateEventTypeDto) => {
  const isHostExist = await findOne(eventDetials.hostId);
  if (!isHostExist) throw conflict("Host not found");

  const data = await insert(eventDetials);
  return data;
};

export const modifyEventType = async (
  id: number,
  eventDetials: UpdateEventTypeDto,
) => {
  const isEventTypeExist = await findEventTypeById(id);
  if (!isEventTypeExist) throw conflict("Event type not found");

  const data = await update(id, eventDetials);
  return data;
};

export const removeEventType = async (id: number) => {
  const isEventTypeExist = await findEventTypeById(id);
  if (!isEventTypeExist) throw conflict("Event type not found");
  const data = await remove(id);
  return data;
};
