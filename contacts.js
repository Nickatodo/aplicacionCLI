// Se importan los modulos necesarios.
const fs = require("node:fs");
const path = require("node:path");
const generateUniqueId = require("generate-unique-id");

// Se guarda la ruta del archivo de contacts.json.
const contactsPath = path.join(__dirname, "db", "contacts.json");

// Funcion para ver todos los contactos
function listContats() {
  // Se lee el archivo
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    // Se verifica que no haya errores en el archivo.
    if (error) {
      console.log("Ocurrio un error al abrir el archivo");
      return;
    }
    // Se parse la informacion de los contactos.
    const contacts = JSON.parse(data);
    // Se muestran los contactos.
    console.table(contacts);
  });
}

// Funcion para ver un contacto por ID
function getContactById(contactId) {
  // Se lee el archivo
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    // Se verifica que no haya errores en el archivo.
    if (error) {
      console.log("Ocurrio un error al abrir el archivo");
      return;
    }
    // Se parse la informacion de los contactos.
    const contacts = JSON.parse(data);
    // Se busca el contacto por id.
    const contact = contacts.find((contact) => contact.id === contactId);
    // Se muestra si encontro a el usuario por id, si no un msg de contacto no encontrado.
    if (contact) {
      console.log(contact);
    } else {
      console.log("Contacto no encontrado");
    }
  });
}

// Funcion para elimininar un contacto por id.
function removeContact(contactId) {
  // Se lee el archivo
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    // Se verifica que no haya errores en el archivo.
    if (error) {
      console.log("Ocurrio un error al abrir el archivo");
      return;
    }
    // Se parse la informacion de los contactos.
    const contacts = JSON.parse(data);
    // Se filtra los contactos con el id del contacto a eliminar.
    const deleteContact = contacts.filter(
      (contact) => contact.id !== contactId
    );
    // Se transforman los contactos a JSON.
    const deleteData = JSON.stringify(deleteContact, null, 2);
    // Se reescribe el archivo de contacts.json.
    fs.writeFile(contactsPath, deleteData, "utf-8", (error) => {
      if (error) {
        console.log("Ocurrio un error al eliminar el contacto");
      } else {
        console.log("Contacto eliminado con exito");
      }
    });
  });
}

// Funcion para añadir contactos.
function addContact(name, email, phone) {
  // Se lee el archivo
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    // Se verifica que no haya errores en el archivo.
    if (error) {
      console.log("Ocurrio un error al abrir el archivo");
      return;
    }
    // Se parse la informacion de los contactos.
    const contacts = JSON.parse(data);
    // Se ordena la informacion ingresada por el usuario.
    const newContact = {
      id: generateUniqueId(),
      name: name,
      email: email,
      phone: phone,
    };
    // Se añade la informacion ordenada.
    contacts.push(newContact);
    // Se transforman los contactos a JSON.
    const addData = JSON.stringify(contacts, null, 2);
    // Se reescribe el archivo de contacts.json.
    fs.writeFile(contactsPath, addData, "utf-8", (error) => {
      if (error) {
        console.log("Ocurrio un error al añadir el usuario");
        return;
      } else {
        console.log("Nuevo contacto añadido con exito");
      }
    });
  });
}

module.exports = {
  listContats,
  getContactById,
  removeContact,
  addContact,
};
