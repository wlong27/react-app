import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root, { charactersloader, characterloader } from "./routes/root.tsx";
import ErrorPage from "./error-page.js";
import Contact, { ContactData } from "./components/contact.tsx";

interface Route {
  path?: string;
  element: JSX.Element;
  errorElement?: JSX.Element;
  children?: ChildRoute[]
  loader?: () => Promise<{ contacts: ContactData[] }>;
}

interface ChildRoute {
  path?: string;
  element: JSX.Element;
  loader?: ({ params }: any) => Promise<{ contacts: ContactData[] }>;
}

const routerConfig: Route[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: charactersloader,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: characterloader,
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
