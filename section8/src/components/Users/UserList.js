import React from "react";
import Card from "./../UI/Card";
import classes from "./UserList.module.css";

export default function UserList(props) {
  const { users } = props;

  return (
    <Card className={classes.users}>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
}
