const model = require("./model");


function showUsers() {
  return model.data;
}

function getUser(id) {
  const user = model.getUser(id);
  return {
    message: `Hello, ${user.name} !`,
    time: new Date().toISOString(),
  };
}

function addUser(data) {
  const { id, name } = data;
  console.log(model.addUser({ id, name }));
  
}

function deleteUser(data) {
  const { name } = data;
  console.log(model.deleteUser({ name }));
}

module.exports = { showUsers, getUser, addUser, deleteUser };
