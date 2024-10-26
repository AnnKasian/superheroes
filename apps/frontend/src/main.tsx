import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { StoreProvider } from "~/libs/components/components.js";

import { createAppClient } from "./providers/client/client.js";
import { createAppRouter } from "./providers/router/router.js";
import { createAppStore } from "./providers/store/store.js";

const client = createAppClient();
const store = createAppStore(client);
const router = createAppRouter();

createRoot(document.querySelector("#root") as HTMLElement).render(
  <StrictMode>
    <StoreProvider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </StoreProvider>
  </StrictMode>,
);
