import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  role: text("role", { enum: ["traveler", "helper", "both"] }).default("both"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSubscriberSchema = createInsertSchema(subscribers).pick({
  email: true,
  role: true,
});

export const insertContactSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  message: true,
});

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactSchema>;
