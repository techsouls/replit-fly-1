import { db } from "./db";
import {
  subscribers,
  contactMessages,
  type InsertSubscriber,
  type InsertContactMessage,
  type Subscriber,
  type ContactMessage,
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const [subscriber] = await db
      .insert(subscribers)
      .values(insertSubscriber)
      .returning();
    return subscriber;
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    const [subscriber] = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email));
    return subscriber;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
