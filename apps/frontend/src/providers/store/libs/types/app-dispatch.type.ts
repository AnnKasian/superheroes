import { type createAppStore } from "../../store.js";

type AppDispatch = ReturnType<typeof createAppStore>["dispatch"];

export { type AppDispatch };
