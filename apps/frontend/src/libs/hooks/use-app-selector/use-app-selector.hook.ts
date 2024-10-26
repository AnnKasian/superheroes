import { type TypedUseSelectorHook, useSelector } from "react-redux";

import { type AppReducers } from "~/providers/store/store.js";

const useAppSelector: TypedUseSelectorHook<AppReducers> = useSelector;

export { useAppSelector };
