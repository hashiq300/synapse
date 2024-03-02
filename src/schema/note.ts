import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer
} from "drizzle-orm/pg-core"
import { users } from "./auth"


export const notes = pgTable("note", {
    id: text("id").notNull().primaryKey(),
    title: text("title").notNull(),
    note: text("note").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull(),
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
})
