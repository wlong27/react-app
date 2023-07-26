import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

interface Route {
  path: string;
  element: JSX.Element;
}

const routerConfig: Route[] = [
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
];

const router = createBrowserRouter(routerConfig);
const rootElement = document.getElementById("root")!;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
