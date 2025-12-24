import { z } from 'zod';
import { insertSubscriberSchema, insertJourneySchema } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type SubscriberInput = z.infer<typeof insertSubscriberSchema>;
export type JourneyInput = z.infer<typeof insertJourneySchema>;
