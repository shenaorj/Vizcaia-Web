import { z } from 'zod';

/**
 * Schema del form de contacto.
 *
 * El mismo schema vive en frontend (validación inline) y backend (validación
 * en `/api/contact`). Si alguien intenta saltarse el form vía curl, el backend
 * rechaza con 400.
 *
 * `website_url` es el honeypot — invisible para humanos vía CSS, si tiene valor
 * el request es de bot.
 */
export const ContactSchema = z.object({
  name: z.string().trim().min(2, { message: 'minLength' }).max(100),
  email: z.email({ message: 'email' }).max(200),
  company: z.string().trim().max(200).optional().or(z.literal('')),
  message: z.string().trim().min(20, { message: 'minLength' }).max(2000, { message: 'maxLength' }),
  source: z.enum(['referral', 'search', 'event', 'other', '']).optional(),
  acceptsPrivacy: z.boolean().refine((v) => v === true, { message: 'mustAccept' }),
  // Honeypot — el schema NO valida vacío (queremos que pase a la route handler
  // y devuelva 200 silencioso para que el bot crea que su submit fue OK).
  websiteUrl: z.string().optional(),
});

export type ContactInput = z.infer<typeof ContactSchema>;
