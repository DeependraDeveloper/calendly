import slug from "slug";
import {
  CreateEventTypeDto,
  UpdateEventTypeDto,
} from "../dtos/event-type.dto.js";
import {
  findByHostId,
  findEventTypeById,
  findActiveByHostIdAndSlug,
  slugExitsForHost,
  insert,
  remove,
  update,
} from "../repositories/event-type.repository.js";
import { findOne } from "../repositories/user.repository.js";
import {
  badRequest,
  conflict,
  forbidden,
  notFound,
} from "../utilities/api-error.js";
import { listRules } from "./avialable.service.js";
import { startRegenerateHostSlotsWorkflow } from "../temporal/client.js";

export const findEventTypesByHostId = async (hostId: number) => {
  const isHostExist = await findOne(hostId);
  if (!isHostExist) throw conflict("Host not found");

  const data = await findByHostId(hostId);

  return data;
};

export const addEventType = async (
  hostId: number,
  eventDetials: CreateEventTypeDto,
) => {
  const isHostExist = await findOne(hostId);
  if (!isHostExist) throw conflict("Host not found");

  const isAvailabiltyRulesExist = await listRules(hostId);
  if (!isAvailabiltyRulesExist) throw conflict("No availabilty rules exists");

  const slugInput =
    eventDetials.slug ?? slug(eventDetials.title, { lower: true });

  if (!slugInput) throw conflict("Could not generated slug for the event");

  const isSlugTaken = await slugExitsForHost(hostId, slugInput);
  if (isSlugTaken)
    throw conflict(
      "A event type with this slug already exists , please use a fifferent slug",
    );

  const eventType = insert(hostId, {
    ...eventDetials,
    slug: slugInput,
  });

  await startRegenerateHostSlotsWorkflow({
    hostId,
  });

  return eventType;
};

export const modifyEventType = async (
  hostId: number,
  id: number,
  eventDetials: UpdateEventTypeDto,
) => {
  const isEventTypeExist = await findEventTypeById(id);
  if (!isEventTypeExist) throw conflict("Event type not found");

  if (isEventTypeExist.hostId !== hostId) {
    throw forbidden("You are not authorized to update this event type");
  }

  if (eventDetials.slug && eventDetials.slug !== isEventTypeExist.slug) {
    const isSlugTaken = await slugExitsForHost(hostId, eventDetials.slug);
    if (isSlugTaken) {
      throw conflict(
        "A event type with this slug already exists, please use a different slug",
      );
    }
  }

  return update(id, eventDetials);
};

export const removeEventType = async (hostId: number, id: number) => {
  const isEventTypeExist = await findEventTypeById(id);
  if (!isEventTypeExist) throw notFound("Event type not found");

  if (isEventTypeExist.hostId !== hostId)
    throw forbidden("Your are unauthorized");
  return remove(id);
};

export const getEventTypeById = async (id: number, hostId: number) => {
  const eventType = await findEventTypeById(id);

  if (!eventType) throw notFound("Event Type not found");

  if (eventType.hostId !== hostId) throw forbidden("Your are unauthorized");

  return eventType;
};

export const getEventTypePublic = async (hostId: number, eventSlug: string) => {
  if (!hostId) throw badRequest("Host is required");
  if (!eventSlug) throw badRequest("slug is required");

  const isHostExist = await findOne(hostId);
  if (!isHostExist) throw conflict("Host not found");

  const eventType = await findActiveByHostIdAndSlug(hostId, eventSlug);

  if (!eventType) throw notFound("Event Type not found");

  return {
    eventType: {
      id: eventType.id,
      title: eventType.title,
      description: eventType.description,
      duration: eventType.durationMinutes,
      locationType: eventType.locationType,
    },
    host: {
      name: isHostExist.name,
      emial: isHostExist.email,
    },
  };
};
