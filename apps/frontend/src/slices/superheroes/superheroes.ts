import { create, get, getAll, remove, update } from "./superheroes.actions.js";

const superheroesActions = {
  get,
  getAll,
  create,
  update,
  remove,
} as const;

export { superheroesActions };
export { reducer as superheroesReducer } from "./superheroes.slice.js";
