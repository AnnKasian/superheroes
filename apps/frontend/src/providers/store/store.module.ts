import {
  type Middleware,
  type ThunkMiddleware,
  type Tuple,
  type UnknownAction,
} from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { type AxiosInstance } from "axios";

import { NotificationsService } from "~/services/notification/notification.js";
import { SuperheroesService } from "~/services/services.js";
import { superheroesReducer } from "~/slices/superheroes/superheroes.js";

import { handleErrorMiddleware } from "./libs/middlewares/middlewares.js";
import { type AppReducers, type ExtraArguments } from "./libs/types/types.js";

const createAppStore = (client: AxiosInstance) => {
  const extra: ExtraArguments = {
    notificationsService: NotificationsService.getInstance(),
    superheroesService: new SuperheroesService(client),
  };

  return configureStore<
    AppReducers,
    UnknownAction,
    Tuple<
      [
        ThunkMiddleware<AppReducers, UnknownAction, ExtraArguments>,
        ...Middleware[],
      ]
    >
  >({
    devTools: true,
    reducer: {
      superheroes: superheroesReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        thunk: {
          extraArgument: extra,
        },
      }).concat(handleErrorMiddleware(extra)),
  });
};

export { createAppStore };
