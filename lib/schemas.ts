import { z } from "zod";

export const serviceTypes = [
  "Wedding Album Design",
  "Wedding Album Printing",
  "Wholesale Album Printing",
  "Digital Photo Printing",
  "Photo Editing & Album Layout",
  "Other",
] as const;

export const quoteSchema = z.object({
  customerName: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/, "Enter a valid 10-digit Indian mobile number"),
  serviceType: z.enum(serviceTypes, { message: "Please choose a service" }),
  albumSize: z.string().trim().max(40).optional().or(z.literal("")),
  quantity: z.string().trim().max(20).optional().or(z.literal("")),
  eventDate: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().max(800).optional().or(z.literal("")),
  contactNumber: z.enum(["0", "1"]),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
