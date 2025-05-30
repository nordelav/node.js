const data = [
  {
    id: 1,
    name: "Valentyn",
  },

  {
    id: 2,
    name: "Nick",
  },
];

function getUser( id ) {
  return data.find((item) => item.id === id);
}

function addUser({ id, name }) {
  const NewUser = {
    id: id,
    name: name,
  };
  data.push(NewUser);
  return NewUser;
}

function deleteUser({ name }) {
  const index = data.findIndex((item)=>item.name===name);
  if(index){
    return data.splice(index,1)[0]
  }

  return null;
}

module.exports = { getUser, addUser, deleteUser, data };
