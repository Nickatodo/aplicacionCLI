// Se importan las funciones necesarias.
const {
  listContats,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

// Se utiliza la libreria de yargs.
const argv = require("yargs").argv;

// Se crea funcion para elegir cada caso a utilizar.
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContats();
      break;
    case "get":
      getContactById(id);
      break;
    case "add":
      addContact(name, email, phone);
      break;
    case "remove":
      removeContact(id);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
