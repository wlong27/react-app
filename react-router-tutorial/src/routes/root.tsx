import { Link, Outlet, useLoaderData } from "react-router-dom";
import { getContacts, getCharacters } from "../services/contacts.ts";
import { ContactData } from "../components/contact.tsx";
//import { useState, useEffect } from "react";
//import Loading from "../components/loading/Loading.tsx";

export default function Root() {
  const { contacts } = useLoaderData() as { contacts: ContactData[] };
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   setIsLoading(true);
  // });

  return (
    <>
      <div id="sidebar">
        <h1>React Router Star Wars Characters</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact: ContactData) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export async function loader() {
  const contacts = await getContacts("");
  return { contacts };
}

export async function charactersloader() {
  const contacts = await getCharacters("");
  return { contacts };
}
export async function characterloader({ params }: any) {
  const contacts = await getCharacters(params.contactId);
  return { contacts };
}
