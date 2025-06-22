import * as repo from '../models/users.model.js';

export const listHabits   = () => repo.getAll();
export const getHabit     = (id) => repo.getById(id);
export const addHabit     = (body) => repo.create(body);
export const patchHabit   = (id, body) => repo.update(id, body);
export const deleteHabit  = (id) => repo.remove(id);
