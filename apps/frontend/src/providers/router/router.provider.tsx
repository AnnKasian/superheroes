import { createBrowserRouter, Navigate } from "react-router-dom";

import { AppRoute } from "~/libs/enums/enums.js";
import {
  CreateSuperhero,
  Superhero,
  Superheroes,
  UpdateSuperhero,
} from "~/pages/pages.js";

import { App } from "../../app.js";

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: AppRoute.ROOT,
      element: <App />,
      children: [
        {
          path: AppRoute.SUPERHEROES,
          element: <Superheroes />,
        },
        {
          path: AppRoute.SUPERHERO,
          element: <Superhero />,
        },
        {
          path: AppRoute.SUPERHERO_CREATE,
          element: <CreateSuperhero />,
        },
        {
          path: AppRoute.SUPERHERO_UPDATE,
          element: <UpdateSuperhero />,
        },
        {
          path: AppRoute.ANY,
          element: <Navigate to={AppRoute.SUPERHEROES} />,
        },
        {
          path: AppRoute.ROOT,
          element: <Navigate to={AppRoute.SUPERHEROES} />,
        },
      ],
    },
  ]);

export { createAppRouter };
