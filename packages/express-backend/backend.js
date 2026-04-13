import express from "express";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

app.use(express.json());

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};
const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job);
};
app.get("/users", (req, res) => {
  const {name, job} = req.query;

  let result;
  if (name !== undefined && job !== undefined) {
    result = findUserByNameAndJob(name, job);
  } else if (name !== undefined) {
    result = findUserByName(name);
  } else {
    result = users["users_list"];
  }

  res.send({ users_list: result });
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});


const deleteUserById = (id) => {  //Here we should use find index instead of find, due to getting object with find
  const index = users["users_list"].findIndex(
    (user) => user["id"] === id
  );
  if (index === -1) {
    return null; // not found
  }
  //here we then grab the user based on the index of the object
  const deletedUser = users["users_list"][index];
  users["users_list"].splice(index, 1);

  return deletedUser;
};

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const deletedUser = deleteUserById(id);
  if (deletedUser === null) {
    res.status(404).send("User not found");
  } else {
    res.send(deletedUser);
  }
});



const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
