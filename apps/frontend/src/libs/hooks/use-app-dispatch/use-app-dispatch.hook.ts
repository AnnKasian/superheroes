import { type UseDispatch, useDispatch } from "react-redux";

import { type AppDispatch } from "~/providers/store/store.js";

const useAppDispatch: UseDispatch<AppDispatch> = useDispatch;

export { useAppDispatch };
