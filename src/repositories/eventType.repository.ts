import { prisma } from "../config/db.js";
import {
  CreateEventTypeDto,
  UpdateEventTypeDto,
} from "../dtos/eventType.dto.js";

// crud for event_types

export const findAll = async () => {
  let event_types = await prisma.eventType.findMany();
  return event_types;
};

export const findByHostId = async (hostId: number) => {
  let data = await prisma.eventType.findMany({
    where: {
      hostId,
    },
  });
  return data;
};

export const findEventTypeById = async (id: number) => {
  const data = await prisma.eventType.findUnique({
    where: {
      id,
    },
  });
  return data;
};

export const insert = async (eventDetials: CreateEventTypeDto) => {
  let data = await prisma.eventType.create({
    data: eventDetials,
  });

  return data;
};

export const update = async (id: number, eventDetials: UpdateEventTypeDto) => {
  let data = await prisma.eventType.update({
    where: {
      id,
    },
    data: eventDetials,
  });

  return data;
};

export const remove = async (id: number) => {
  let data = await prisma.eventType.delete({
    where: {
      id,
    },
  });

  return data;
};
