import {
  CreateEventTypeDto,
  UpdateEventTypeDto,
} from "../dtos/event-type.dto.js";
import {
  findAll,
  findByHostId,
  findEventTypeById,
  findByHostIdAndSlug,
  findBySlug,
  insert,
  remove,
  update,
} from "../repositories/event-type.repository.js";
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

export const findEventTypesByHostIdAndSlug = async (
  hostId: number,
  slug: string,
) => {
  const isHostExist = await findOne(hostId);
  if (!isHostExist) throw conflict("Host not found");

  const isSlugExist = await findBySlug(slug);
  if (!isSlugExist) throw conflict("Slug not found");

  const data = await findByHostIdAndSlug(hostId, slug);

  return data;
};

export const addEventType = async (
  hostId: number,
  eventDetials: CreateEventTypeDto,
) => {
  const isHostExist = await findOne(hostId);
  if (!isHostExist) throw conflict("Host not found");

  const data = await insert(hostId, eventDetials);
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
