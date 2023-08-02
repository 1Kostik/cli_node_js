const { nanoid } = require("nanoid");
const path = require("path");
const fs = require("fs").promises;
const contactsPath = path.join(__dirname, "db", "/contacts.json");
console.log(contactsPath);

// TODO: задокументувати кожну функцію
async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf8" });
  const list = await JSON.parse(data);

  return list;
  // ...твій код. Повертає масив контактів.
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    console.log("We did not find this contact");
    return null;
  }
  return contacts[index];

  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    console.log("We did not find this contact");
    return null;
  }
  const deleteContasts = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(deleteContasts);
  return deleteContasts;
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(newContact);
  return newContact;
  // ...твій код. Повертає об'єкт доданого контакту.
}

module.exports = { listContacts, getContactById, addContact, removeContact };
