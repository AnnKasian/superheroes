const SuperheroesApiPath = {
  CREATE: "/create",
  UPDATE: "/update/:id",
  GET: "/get/:id",
  GET_ALL: "/get-all",
  DELETE: "/delete/:id",
} as const;

type SuperheroesApiPath =
  (typeof SuperheroesApiPath)[keyof typeof SuperheroesApiPath];

export { SuperheroesApiPath };
