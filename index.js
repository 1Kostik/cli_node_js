const { Command } = require("commander");
const program = new Command();
const contacts = require("./contacts");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      // ...
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      console.table(contact);
      // ... id
      break;

    case "add":
      const addContact = await contacts.addContact({ name, email, phone });
      console.table(addContact);
      // ... name email phone
      break;

    case "remove":
      const delContast = await contacts.removeContact(id);
      console.table(delContast);
      // ... id
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
