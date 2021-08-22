import React, { useState } from "react";
import Card from "./../UI/Card";
import Button from "./../UI/Button";
import ErrorModal from "./../UI/ErrorModal";

import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [userName, setUserName] = useState("PhuocPG");
  const [age, setAge] = useState("25");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    if (userName.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (none-empty value).",
      });
      return;
    }

    if (age < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (age > 0).",
      });
      return;
    }

    let data = {
      name: userName,
      age: age,
    };

    props.addUser(data);

    setUserName("");
    setAge("");
  };

  const onHandleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.type === "checkbox" ? target.checked : target.value;

    switch (name) {
      case "userName":
        setUserName(value);
        break;
      case "age":
        setAge(value);
        break;
      default:
        console.error("Item not define");
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes["input-form"]}>
        <form onSubmit={addUserHandler} className="form-horizontal">
          <div>
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userName}
              onChange={onHandleChange}
            />
          </div>
          <div>
            <label htmlFor="age">Age (Years)</label>
            <input
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={onHandleChange}
            />
          </div>
          <div>
            <Button type="submit">Add User</Button>
          </div>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default AddUser;
