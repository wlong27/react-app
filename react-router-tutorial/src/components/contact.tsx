import { Form, useLoaderData } from "react-router-dom";
import { getCharacters } from "../contacts.ts";

export interface ContactData {
  id?: string;
  first: string;
  last: string;
  avatar: string;
  twitter?: string;
  notes?: string;
  favorite: boolean;
  createdAt?: Date;
  height?: string;
  mass?: string;
  hairColor?: string;
  eyeColor?: string;
  birthYear?: string;
}

interface ContactProps {
  contact: ContactData;
}

export async function characterloader({ params }: any) {
  const contacts = await getCharacters(params.contactId);
  return contacts;
}

export default function Contact() {
  const { contacts } = useLoaderData() as {contacts: ContactData[]};
  const contact = contacts[0];

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          alt=""
          title="test"
          src={contact.avatar || undefined}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}
        {contact.height && <p>Height: {contact.height}</p>}
        {contact.mass && <p>Mass: {contact.mass}</p>}
        {contact.eyeColor && <p>EyeColor: {contact.eyeColor}</p>}
        {contact.hairColor && <p>HairColor: {contact.hairColor}</p>}
        {contact.birthYear && <p>BirthYear: {contact.birthYear}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event: Event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }: ContactProps) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
