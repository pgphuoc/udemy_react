import React, { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UserList from "./components/Users/UserList";

const DUMMY_USER = [
  {
    name: "John",
    age: 28,
  },
  {
    name: "John Smith",
    age: 22,
  },
  {
    name: "Smith",
    age: 23,
  },
  {
    name: "Mary",
    age: 25,
  },
  {
    name: "Lisa",
    age: 18,
  },
];

function App() {
  const [users, setUsers] = useState(DUMMY_USER);

  const addUser = (data) => {
    setUsers((prevState) => {
      return [data, ...prevState];
    });
  };

  return (
    <div className="App">
      <AddUser addUser={addUser} />
      <UserList users={users} />
    </div>
  );
}

export default App;
