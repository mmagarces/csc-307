
import React, { useState } from "react";
import Table from "./Table";

function MyApp() {
  const [characters, setCharacters] = useState([
    {
      name: "Charlie",
      job: "Janitor" // the rest of the data
    },
    {
      name: "Ronny",
      job: "Electrician" // the rest of the data
    },
    {
      name: "Elmo",
      job: "Puppet" // the rest of the data
    },
    {
      name: "Rocco",
      job: "Rock" // the rest of the data
    },
  ]);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  return (
    <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
  </div>
  );
}



export default MyApp;