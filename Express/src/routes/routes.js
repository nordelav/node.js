import { Router } from "express";
import {z} from 'zod';
import  {makeClassInvoker} from 'awilix-express';

import { BrewsController } from "../controllers/controller.js";
import { BrewDTO } from "../dto/BrewDTO.js";

import {validateParams} from "../middlewares/validateParams.js";
import {asyncHandler} from '../middlewares/asyncHandler.js';
import {validate} from '../middlewares/validate.js';
import {registry} from '../openapi/registry.js';


const router = Router();
const ctl = makeClassInvoker(BrewsController);

const paramsSchema = z.object({
  id: z.string().describe('User ID')
});

router.get ('/brews', ctl('index'));

registry.registerPath({
  method:'get',
  path: '/api/brews',
  tags: ['Brews'],
  responses:{
    200:{
      description:"List of coffee brews",
      content:{'application/json': {schema: z.array(BrewDTO)}
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
  request: {params: paramsSchema}, // опис path-param
  responses: {
    200: {description: 'User', content: {'application/json': {schema: BrewDTO}}},
    404: {description: 'User not found'}
  }
})

router.post(
  '/brews',
  validate(BrewDTO),
  asyncHandler(ctl('create'))
);
registry.registerPath({
  method: 'post',
  path: '/api/brews',
  tags: ['Brews'],
  request: {
    body: {required: true, content: {'application/json': {schema: BrewDTO}}}
  },
  responses: {
    201: {description: 'Created', content: {'application/json': {schema: BrewDTO}}},
    400: {description: 'Validation error'}
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
    body: {required: true, content: {'application/json': {schema: BrewDTO}}}
  },
  responses: {
    200: {description: 'Updated user', content: {'application/json': {schema: BrewDTO}}},
    400: {description: 'Validation error'},
    404: {description: 'User not found'}
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
  request: {params: paramsSchema},
  responses: {
    204: {description: 'Deleted'},
    404: {description: 'User not found'}
  }
})

export {router};