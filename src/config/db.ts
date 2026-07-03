import { DATABASE_URL } from "./env.js";
import { PrismaPg } from "@prisma/adapter-pg"; 
import { PrismaClient } from "../../generated/prisma/client.js";

// Create a new instance of PrismaClient with the PostgreSQL adapter and the connection string. The log option is set to log queries, info, warnings, and errors.
// [PrismaClient] is the main class used to interact with the database. It provides methods for querying and manipulating data.
// [Adapter] is used to connect PrismaClient to a specific database, in this case, PostgreSQL.
export const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: DATABASE_URL }),
//   log: ["query", "info", "warn", "error"],
})

export async function connectDB() {
    try {
        // Connect to the database using PrismaClient. This establishes a connection to the PostgreSQL database specified in the DATABASE_URL.
        await prisma.$connect();
        console.log("Connected to the database successfully.");
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}


