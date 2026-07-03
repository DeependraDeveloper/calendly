// Repository for user-related database operations
import {prisma} from "../config/db.js";


export const users = async () => {
  let data = await prisma.user.findMany();
  return data;
}