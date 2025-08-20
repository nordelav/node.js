import { request, Router } from "express";
import { z } from 'zod';
import { makeClassInvoker } from 'awilix-express';
import rateLimit from "express-rate-limit";

import { BrewsController } from "../controllers/controller.js";
import { BrewDTO } from "../dto/BrewDTO.js";

import { validateParams } from "../middlewares/validateParams.js";
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { validate } from '../middlewares/validate.js';
import { registry } from '../openapi/registry.js';


const router = Router();
const ctl = makeClassInvoker(BrewsController);

const paramsSchema = z.object({
  id: z.string().describe('User ID')
});

const querySchema = z.object({
  method: z.enum(['v60', 'aeropress', 'chemex', 'espresso']).optional(),
  rating: z.optional(z.number().min(0).max(5)).optional(),
})

const postLimit = rateLimit({
  windowMs: 60*1000,
  max: 10,
  message: 'Too many POST requests from this IP, please try again after 60 seconds.',
  headers:true
});


router.get('/brews', validateParams(querySchema), ctl('list'));

registry.registerPath({
  method: 'get',
  path: '/api/brews',
  tags: ['Brews'],
  request: { query: querySchema },
  responses: {
    200: {
      description: "List of coffee brews",
      content: {
        'application/json': { schema: z.array(BrewDTO) }
      }
    }
  }
})

router.get(
  '/brews/:id',
  validateParams(paramsSchema),
  ctl('show')
);
registry.registerPath({
  method: 'get',
  path: '/api/brews/{id}',
  tags: ['Brews'],
  request: { params: paramsSchema },
  responses: {
    200: { description: 'User', content: { 'application/json': { schema: BrewDTO } } },
    404: { description: 'User not found' }
  }
})

router.post(
  '/brews',
  validate(BrewDTO),
  postLimit,
  asyncHandler(ctl('create'))
);
registry.registerPath({
  method: 'post',
  path: '/api/brews',
  tags: ['Brews'],
  request: {
    body: { required: true, content: { 'application/json': { schema: BrewDTO } } }
  },
  responses: {
    201: { description: 'Created', content: { 'application/json': { schema: BrewDTO } } },
    400: { description: 'Validation error' },
    429:{description:'Too many POST requests from this IP, please try again after 60 seconds.'}
  }
})

router.put(
  '/brews/:id',
  validateParams(paramsSchema),
  validate(BrewDTO),
  asyncHandler(ctl('update'))
);
registry.registerPath({
  method: 'put',
  path: '/api/brews/{id}',
  tags: ['Brews'],
  request: {
    params: paramsSchema,
    body: { required: true, content: { 'application/json': { schema: BrewDTO } } }
  },
  responses: {
    200: { description: 'Updated user', content: { 'application/json': { schema: BrewDTO } } },
    400: { description: 'Validation error' },
    404: { description: 'User not found' }
  }
})

router.delete(
  '/brews/:id',
  asyncHandler(ctl('remove'))
);
registry.registerPath({
  method: 'delete',
  path: '/api/brews/{id}',
  tags: ['Brews'],
  request: { params: paramsSchema },
  responses: {
    204: { description: 'Deleted' },
    404: { description: 'User not found' }
  }
})

export { router };