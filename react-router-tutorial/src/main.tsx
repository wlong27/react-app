import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root, { loader as rootLoader } from "./routes/root.js";
import ErrorPage from "./error-page.js";
import Contact, { ContactData } from "./components/contact.tsx";

interface Route {
  path?: string;
  element: JSX.Element;
  errorElement?: JSX.Element;
  children?: Route[]
  loader?: () => Promise<{ contacts: ContactData[] }>;
}

//outside root
// const routerConfig: Route[] = [
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: "contacts/:contactId",
//     element: <Contact/>
//   }
// ];

//nested inside root
const routerConfig: Route[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  }
];

const router = createBrowserRouter(routerConfig);
const rootElement = document.getElementById("root")!;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
