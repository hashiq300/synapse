import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const sql = postgres(process.env.DB_URI!, { max: 3 })
export const db = drizzle(sql);
// await migrate(db, { migrationsFolder: "drizzle" });