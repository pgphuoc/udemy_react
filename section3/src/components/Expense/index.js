import React, { useState } from "react";
import "./Expense.css";

import ExpenseItem from "./ExpenseItem";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseChart from "./ExpenseChart/ExpenseChart";

import Card from "./../Card";

const Expense = (prop) => {
  const { items } = prop;

  const [filteredYear, setFilteredYear] = useState("2020");

  const showExpressItems = () => {
    let result = "";
    let filterItem = items.filter((item) => {
      return item.date.getFullYear().toString() === filteredYear;
    });

    result =
      filterItem.length === 0 ? (
        <p className="no-result">No result..</p>
      ) : (
        filterItem.map((item, index) => {
          return (
            <ExpenseItem
              key={item.id}
              title={item.title}
              amount={item.amount}
              date={item.date}
            />
          );
        })
      );
    return result;
  };

  const filterChangeHandler = (value) => {
    setFilteredYear(value);
  };

  return (
    <Card className="expenses">
      <ExpenseFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      <ExpenseChart expenses={items} />
      {showExpressItems()}
    </Card>
  );
};

export default Expense;
