import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";

interface Route {
  path: string;
  element: JSX.Element;
  errorElement: JSX.Element;
}

const routerConfig: Route[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />
  },
];

const router = createBrowserRouter(routerConfig);
const rootElement = document.getElementById("root")!;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
