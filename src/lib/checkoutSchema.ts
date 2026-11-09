// Centralized Zod validation schema for checkout flow

import { z } from 'zod';

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .max(80, 'Full name cannot exceed 80 characters'),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'),
  address: z
    .string()
    .min(5, 'Street address must be at least 5 characters')
    .max(120, 'Street address is too long'),
  city: z.string().min(2, 'City is required').max(50, 'City name is too long'),
  postalCode: z
    .string()
    .min(3, 'Postal code must be at least 3 characters')
    .max(12, 'Invalid postal code format'),
  deliveryMethod: z.enum(['standard', 'express'], {
    message: 'Please choose a shipping speed',
  }),
  cardNumber: z
    .string()
    .regex(/^(?:\d{4}[ -]?){3}\d{4}$/, 'Card number must be 16 digits (e.g., 4000 1234 5678 9010)'),
  cardExpiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry must be in MM/YY format (e.g. 08/28)'),
  cardCvc: z.string().regex(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
