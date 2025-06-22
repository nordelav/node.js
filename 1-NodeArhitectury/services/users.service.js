import * as repo from '../models/users.model.js';

export const listInfo   = () => repo.getAll();
export const getInfo     = (id) => repo.getById(id);
export const addInfo     = (body) => repo.create(body);
export const patchInfo   = (id, body) => repo.update(id, body);
export const deleteInfo  = (id) => repo.remove(id);
