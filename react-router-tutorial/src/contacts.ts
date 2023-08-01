import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { ContactData } from "./components/contact.tsx";
import axios from "axios";

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
}

export async function getContacts(query: any): Promise<ContactData[]>{
  await fakeNetwork(`getContacts:${query}`);
  let contacts: ContactData[] | null = await localforage.getItem("contacts");
  if (!contacts) {
    contacts = [];
  }
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

const mapCharacterToContact = (character:Character) => {
  let contact: ContactData = {
    id : character.url.replace('https://swapi.dev/api/people/',''),
    first: character.name,
    last: '',
    avatar: `https://picsum.photos/200/200`,
    favorite: false,
    height: character.height,
    hairColor: character.hair_color,
    eyeColor: character.eye_color,
    birthYear: character.birth_year
  };
  return contact;
}

export async function getCharacters(query: string): Promise<ContactData[]> {
  let response;
  if (query) {
    response = await axios.get(`https://swapi.dev/api/people/${query}`);
    const character = await response.data;
    const array = [character].map(mapCharacterToContact);
    return array;
  }
  else {
    response = await axios.get(`https://swapi.dev/api/people`);
    const characters = await response.data.results;
    const array = characters.map(mapCharacterToContact);
    return array;
  }
}


export async function createContact(): Promise<ContactData> {
  await fakeNetwork(null);
  let id = Math.random().toString(36).substring(2, 9);
  let contact: ContactData = {
    id,
    first: "",
    last: "",
    avatar: "",
    favorite: false
  };
  let contacts = await getContacts('');
  contacts.unshift(contact);
  await set(contacts);
  return contact;
}

export async function getContact(id: string) {
  await fakeNetwork(`contact:${id}`);
  let contacts: ContactData[] | null = await localforage.getItem("contacts");
  let contact = contacts?.find(contact => contact.id === id);
  return contact ?? null;
}

export async function updateContact(id: string, updates: string) {
  await fakeNetwork(null);
  let contacts: ContactData[] | null = await localforage.getItem("contacts");
  let contact = contacts?.find(contact => contact.id === id);
  if (!contact) {
    throw new Error("No contact found for id");
  }
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
}

export async function deleteContact(id: any) {
  let contacts: ContactData[] | null  = await localforage.getItem("contacts");
  let index: number | undefined = contacts?.findIndex(contact => contact.id === id);
  if (contacts && index && index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

function set(contacts: any): Promise<ContactData[]> {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache: any = {};

async function fakeNetwork(key: any) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}