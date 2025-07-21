import { z } from 'zod';
import { registry } from '../openapi/registry.js';

export const BrewDTO = z.object({

  Beans: z.string().min(3).max(40),
  Method: z.enum(['v60', 'aeropress', 'chemex', 'espresso']),
  Rating: z.optional(z.number().min(0).max(5)),
  Notes: z.optional(z.string().max(200)),
  BrewedAt: z.optional(z.string().datetime()).default(new Date().toISOString())

})

registry.register("Brew",BrewDTO);
