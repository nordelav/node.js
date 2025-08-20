import { nanoid } from "nanoid";


export class BrewsModel {
  static scope = 'singleton'; 
  #brewStorage = new Map();

  constructor() {
    console.log("BrewStorage initialized");
  }

  all() {

    return [...this.#brewStorage.values()]

  }

  find(id) {
    return this.#brewStorage.get(id) ?? null;
  }

  create(dto) {
    const id = nanoid(8);
    const brew = { id, ...dto };
    console.log(brew);
    this.#brewStorage.set(id, brew);

    return brew;
    // return this.#brewStorage;
  }


  update(id, dto) {
    if (!this.#brewStorage.has(id)) return null;
    const brew = { id, ...dto };
    this.#brewStorage.set(id, brew);
    return brew;
  }

  remove(id) {
    return this.#brewStorage.delete(id);
  }
}

