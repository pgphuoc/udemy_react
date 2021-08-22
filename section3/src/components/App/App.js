import React, { useState } from "react";

import "./App.css";

import Expense from "./../Expense";
import NewExpense from "./../NewExpense";

const DUMMY_EXPENSES = [
  {
    id: "1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

function App() {
  const [expense, setExpense] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (newExpense) => {
    setExpense((prevState) => {
      return [newExpense, ...prevState];
    });
  };
  return (
    <div className="App">
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expense items={expense} />{" "}
    </div>
  );
}

export default App;
