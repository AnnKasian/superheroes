import { type superheroesReducer } from "~/slices/superheroes/superheroes.js";

type AppReducers = {
  superheroes: ReturnType<typeof superheroesReducer>;
};

export { type AppReducers };
