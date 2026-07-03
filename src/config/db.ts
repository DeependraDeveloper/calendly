import { DATABASE_URL } from "./env.js";
import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg"; 

const adapter = new PrismaPg({
    connectionString: DATABASE_URL,
});

export const prisma = new PrismaClient({
    adapter,
    log: ["query", "info", "warn", "error"],
});

export async function connectDB() {
    try {
        await prisma.$connect();

        console.log("Connected to the database successfully.");
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}


