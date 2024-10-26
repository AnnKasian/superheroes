import { type AppDispatch } from "./app-dispatch.type.js";
import { type AppReducers } from "./app-reducers.type.js";
import { type ExtraArguments } from "./extra-arguments.type.js";

type AsyncThunkConfig = {
  dispatch: AppDispatch;
  extra: ExtraArguments;
  state: AppReducers;
};

export { type AsyncThunkConfig };
