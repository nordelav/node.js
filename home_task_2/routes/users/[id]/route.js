import { getById, remove, update } from "../../../models/users.model.js";
import { json, bodyJSON } from "../../../lib/helpers.js";
export async function GET({ res, params }) {
  try {
    const id = params.id;
    const user = await getById(id)
    json(res, 201, user);
  } catch(e) {
    return json(res, 400, { error:e.message })
  }


};


export async function DELETE({ res, params }) {
  try {
    const id = params.id;
    const isDeleted = await remove(id);

    json(res, 201, { message: `user ${id} has been deleted !`, isDeleted: isDeleted });
  } catch (e) {
    return json(res, 400, { error: e.message })
  }

}

export async function PATCH({ req, res, params }) {
  try {
    const id = params.id;
    const data = await bodyJSON(req);
    json(res, 201, await update(id, data))
  }
  catch (e) {
    return json(res, 400, { error: e.message })

  }
}