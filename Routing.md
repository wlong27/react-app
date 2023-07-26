# Routing with React Router
- Popular library to handle routing and navigation.
- Client side routing (without requiring full page refresh).

## Setup
- Install the package using a package manager such as yarn or npm.
  
```bash
npm install react-router-dom
```

- Route consists of `path` and `element`.
- `path` defines the URL pattern.
- `element` is the component to be rendered.
- Use the createBrowserRouter() and provide array of route objects.


```tsx
const router = createBrowserRouter([
    { path: '/', element: <HomePage />},
    { path: '/characters', element: <CharactersPage />}
    { path: '/characters/:id', element: <CharacterDetails />}
]);

<React.StrictMode>
    <RouterProvider router={router} />
</React.StrictMode>

```
  

## Route Parameters
- Dynamic values passed to components. Capture via parameters.
- Use colon(:) in the `path` e.g. (e.g. /characters/:id).
- `useParams()` hook to get the route parameters .
- `useSearchParams()` hook to get/update the query string parameters.

```tsx
//get route params
const { id } = useParams();

//get/update search params
const [searchParams, setSearchParams] = useSearchParams();
```

## Navigation
- Handles page/screen transition using components instead of `<a>` tags.
- `<Link>` create links between different routes.
- `<NavLink>` adds active class to the current link by default. Can be customized using the `className` prop.

```tsx
<Link to='/characters'>Characters</Link>

//Adds the 'active' class if the route matches
<NavLink to='/characters'>Characters</NavLink>
```

### Programmatic Navigation
- `useNavigate()` hook to redirect user programmatically.

```tsx
const navigate = useNavigate();
const handleSubmit = () => {
    navigate('/');
}
```

## Error Handling
- `errorElement` is a property of the root route.
- Specify component to render when route is not found or errors in rendering.

```tsx
const router = createBrowserRouter([
    { path: '/', element: <HomePage />, errorElement: <ErrorPage /> },
    { path: '/characters', element: <CharactersPage />}
]);
```

## Nested Routes
- You can render components inside a parent component (root).
- The root component can be used as a Layout component.
- In which it can help to enforce a common layout.
  
```tsx
const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        children:[
        {
            path: 'characters',
            element: <CharactersPage />
        },
        {
            path: 'about',
            element: <About />
        }],
    }
]);
```

- `<Outlet>` in the parent component to hold and render child components
- In this example, the `HomePage` is the parent component. 

```tsx
const HomePage = () => {
    return (
        <>
            <header>Nav</header>
            <Outlet />
        <>
    );
}
```

# References
 [ReactRouter.com Tutorial](https://reactrouter.com/en/main/start/tutorial).
