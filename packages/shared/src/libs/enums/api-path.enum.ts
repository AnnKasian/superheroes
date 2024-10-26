const APIPath = {
  SUPERHEROES: "/superheroes",
} as const;

type APIPath = (typeof APIPath)[keyof typeof APIPath];

export { APIPath };
