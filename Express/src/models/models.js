import { nanoid } from "nanoid";


export class BrewsModel {
  static scope = 'singleton';
  #brewStorage = new Map ();

  constructor (){
    console.log("BrewStorage initialized");
  }

  all (){
    return[...this.#brewStorage.values()]
  }

  find (id){
    return this.#brewStorage.get(id) ?? null;
  }

  create (dto){
    const id = nanoid (8);
    const brew = {id, ...dto};
    this.#brewStorage.set (id,brew);
    return brew;
  }


  update (id,dto){
    if (!this.#brewStorage.has(id)) return null;
    const brew = {id, ...dto};
    this.#brewStorage.set(id, brew);
    return brew;
  }

  remove (id){
    return this.#brewStorage.delete(id); 
  }
}

