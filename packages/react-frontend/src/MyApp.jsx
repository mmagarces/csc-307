
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(id) {
    console.log("Clicked delete:", id);

    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log("STATUS:", res.status);
        if (res.status === 204) {//prev here is used to see the latest state of react
          setCharacters((prev) =>//Without it, for some reason, updates dont show in real time on frontend
            prev.filter((c) => c.id !== id)
          );
        } else {
          console.log("Delete failed");
        }
      })
      .catch(console.log);
  }

  //New func IE3
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

//new func
function postUser(person) {
  const promise = fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  return promise;
}
//modified func
function updateList(person) {
  postUser(person)
    .then((res) => {
      if (res.status === 201) { //If 201 status, or success
        return res.json();
      } else {
        console.log("Create failed:", res.status);
        return null;
      }
    }) //on success then do, (quiz 2 last answer :/)
    .then((newUser) => {
      if (newUser) {
        setCharacters((prev) => [...prev, newUser]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

return (
  <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
      
    />
    <Form handleSubmit={updateList} />
  </div>
);
}



export default MyApp;