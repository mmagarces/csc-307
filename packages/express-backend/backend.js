import express from "express";
import cors from "cors";  //new
import userServices from "./services/user-services.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));
  
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  userServices
    .getUsers(name, job)
    .then((result) => {
      res.send({ users_list: result });
    })
    .catch((error) => {
      res.status(500).send("Server error");
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  userServices
    .findUserById(id)
    .then((result) => {
      if (!result) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(result);
      }
    })
    .catch(() => res.status(500).send("Server error"));
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  userServices
    .deleteUserById(id)
    .then((result) => {
      if (!result) {
        res.status(404).send("User not found");
      } else {
        res.status(204).send();
      }
    })
    .catch(() => res.status(500).send("Server error"));
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  userServices
    .addUser(userToAdd)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(() => res.status(500).send("Server error"));
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
