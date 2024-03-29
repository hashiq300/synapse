import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
    schema: "./src/schema/*",
    out: "./drizzle",
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DB_URI!,
    }
} satisfies Config;
