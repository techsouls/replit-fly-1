import { z } from "zod";

export const subscriberSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.enum(["traveler", "helper", "both"]),
  createdAt: z.date(),
});

export const journeySchema = z.object({
  id: z.string(),
  userId: z.string(),
  departureCity: z.string(),
  arrivalCity: z.string(),
  departureDate: z.string(),
  description: z.string(),
  lookingFor: z.enum(["help", "offer-help", "both"]),
  createdAt: z.date(),
});

export const insertSubscriberSchema = z.object({
  email: z.string().email(),
  role: z.enum(["traveler", "helper", "both"]).default("both"),
});

export const insertJourneySchema = z.object({
  departureCity: z.string().min(1),
  arrivalCity: z.string().min(1),
  departureDate: z.string().min(1),
  description: z.string().min(1),
  lookingFor: z.enum(["help", "offer-help", "both"]),
});

export type Subscriber = z.infer<typeof subscriberSchema>;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Journey = z.infer<typeof journeySchema>;
export type InsertJourney = z.infer<typeof insertJourneySchema>;
