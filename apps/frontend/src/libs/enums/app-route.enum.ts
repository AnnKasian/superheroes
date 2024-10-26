const AppRoute = {
  ANY: "*",
  ROOT: "/",
  SUPERHEROES: "/superheroes",
  SUPERHERO: "/superheroes/:id",
  SUPERHERO_CREATE: "/superheroes/create",
  SUPERHERO_UPDATE: "/superheroes/update/:id",
} as const;

type AppRoute = (typeof AppRoute)[keyof typeof AppRoute];

export { AppRoute };
