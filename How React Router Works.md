# How React Router Works

React Router is a popular library used with React.js to handle routing and navigation in web applications. It allows you to create single-page applications (SPAs) where the content is dynamically updated without requiring a full page refresh. React Router provides a declarative way to define routes and manage the application's URL and component rendering based on the current URL.

React Router enables "client side routing". Client side routing allows your app to update the URL from a link click without making another request for another document from the server. This results in a faster user experiences because the browser doesn't need to request an entirely new document or re-evaluate CSS and JavaScript assets for the next page. 

## Installation

To use React Router in your React.js application, you need to install it using a package manager like npm or yarn:

```bash
npm install react-router-dom
```

## Setup

Once installed, you'll need to set up your application to use the Router component, which provides the routing functionality. Typically, this is done in your main application file (e.g., index.js or App.js):

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={Home} />
        <Route path="/about" component={About} />
      </Routes>
    </Router>
  );
}

export default App;
```

## Route Components

In the example above, we've defined two route components: `<Home />` and `<About />`. When the user navigates to the root path ("/"), the `<Home />` component will be rendered, and when they navigate to the "/about" path, the `<About />` component will be rendered.

## `<Router>` and `<Switch>`

The `<Router>` component wraps around your application's content and provides the context for routing. The `<Switch>` component is used to ensure that only one route's component is rendered at a time. It goes through the defined routes in order and renders the first one that matches the current URL.

## Route Matching

React Router uses path matching to determine which route should be rendered. The `path` prop in the `<Route>` component defines the URL pattern to match. For exact matches, use `exact` as a prop to ensure that the route only matches when the URL matches the path exactly.

## Route Parameters

You can also define dynamic segments in your path using the colon (:) syntax. For example, to handle dynamic user profiles, you can define a route like this:

```jsx
<Route path="/users/:username" component={UserProfile} />
```

The `username` parameter will be extracted from the URL and passed as a prop to the `UserProfile` component.

## Navigation

React Router provides components like `<Link>` and `<NavLink>` to handle navigation within your application. Instead of using traditional anchor tags (`<a>`), these components ensure that navigation occurs without a full page refresh, providing a smooth user experience.

```jsx
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```


### `NavLink`
A `<NavLink>` is a special kind of `<Link>` that knows whether or not it is "active" or "pending". This is useful when building a navigation menu, such as a breadcrumb or a set of tabs where you'd like to show which of them is currently selected. It also provides useful context for assistive technology like screen readers.

import { NavLink } from "react-router-dom";

```jsx
<NavLink
  style={({ isActive, isPending }) => {
    return {
      color: isActive ? "red" : "inherit",
    };
  }}
  className={({ isActive, isPending }) => {
    return isActive ? "active" : isPending ? "pending" : "";
  }}
/>
```

## Nested Routes

React Router supports nested routes, allowing you to create complex page structures with multiple levels of components and routes.
