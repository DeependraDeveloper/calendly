import { prisma } from "../config/db.js";
import {
  CreateEventTypeDto,
  UpdateEventTypeDto,
} from "../dtos/event-type.dto.js";

export async function findByHostId(hostId: number) {
  let data = await prisma.eventType.findMany({
    where: {
      hostId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export const findEventTypeById = async (id: number) => {
  const data = await prisma.eventType.findUnique({
    where: {
      id,
    },
  });
  return data;
};

// intersection type in ts
export const insert = async (
  hostId: number,
  eventDetials: CreateEventTypeDto & { slug: string },
) => {
  let data = await prisma.eventType.create({
    data: {
      ...eventDetials,
      hostId,
    },
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

export async function findByHostIdAndSlug(hostId: number, slug: string) {
  let data = await prisma.eventType.findFirst({
    where: {
      hostId,
      slug,
    },
  });
  return data;
}

export async function findActiveByHostIdAndSlug(hostId: number, slug: string) {
  let data = await prisma.eventType.findFirst({
    where: {
      isActive: true,
      hostId,
      slug,
    },
  });
  return data;
}

export async function slugExitsForHost(hostId: number, slug: string) {
  let data = await prisma.eventType.findFirst({
    where: {
      hostId,
      slug,
    },
  });
  return data !== null;
}

export const remove = async (id: number) => {
  let data = await prisma.eventType.delete({
    where: {
      id,
    },
  });

  return data;
};

export async function findActiveEventTypesByHost(hostId: number) {
  return prisma.eventType.findMany({
    where: {
      hostId,
      isActive: true,
    },
  });
}
