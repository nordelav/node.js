import { createContainer, asClass } from 'awilix';
import { BrewsModel } from './models/models.js';
import { BrewsController } from './controllers/controller.js';
import { BrewsService } from './services/services.js';
import { objectMap } from './utils/ObjectMap.js';

const brewsModule = {
  brewsModel: BrewsModel,
  brewsService: BrewsService,
  BrewsController: BrewsController
}


export const container = createContainer({ injectionMode: 'CLASSIC' }).register(
  objectMap(brewsModule, value => asClass(value)[value.scope]())
)
