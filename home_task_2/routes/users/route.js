import { getAll, create } from "../../models/users.model.js";
import { json, bodyJSON } from "../../lib/helpers.js";
export async function GET({ res }) {


  return json(res, 200, await getAll());

}

export async function POST({ req, res }) {
  try {
    const body = await bodyJSON(req);
    const data = await create(body);
    return json(res, 201, data);
  } catch {
    return json(res, 400, { error: "Invalid JSON !" })
  }

} 