export class BrewsService {
  static scope = 'scoped';

  constructor(brewsModel) {
    console.log('BrewsService initalized');
    this.brewsModel = brewsModel;
  }

  getAll({ method, ratingMin } = {}) {

    const data = this.brewsModel.all();

    const min = ratingMin != null ? Number(ratingMin) : null;

    
    let out = data;

    if (min != null && !Number.isNaN(min)) {
      out = out.filter(b => {
        const rating = b.rating ?? b.Rating; 
        return typeof rating === 'number' && rating >= min;
      });
    }

    if (method) {
      const m = (b) => (b.method ?? b.Method);
      out = out.filter(b => m(b) === method);
    }

    return out;
  }

  getOne(id) {
    const user = this.brewsModel.find(id);
    if (!user) throw Object.assign(new Error('Brews not found'), { status: 404 });
    return user;
  }

  create(dto) {
    return this.brewsModel.create(dto);
  }

  update(id, dto) {
    const user = this.brewsModel.update(id, dto);
    if (!user) throw Object.assign(new Error('Brew not found'), { status: 404 });
    return user;
  }

  delete(id) {
    if (!this.brewsModel.remove(id))
      throw Object.assign(new Error('Brew not found'), { status: 404 });
  }
}