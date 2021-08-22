import React, { useState } from "react";
import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

export default function NewExpense(props) {
  const [isEditing, setIsEditing] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      id:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
      ...enteredExpenseData,
    };
    props.onAddExpense(expenseData);
  };

  const startEditingHandler = () => {
    setIsEditing((prevState) => {
      return !prevState;
    });
  };

  const onCancelHandler = () => {
    setIsEditing(false);
  };

  const showContent = () => {
    let result = "";
    result = isEditing ? (
      <ExpenseForm
        onSaveExpenseData={saveExpenseDataHandler}
        onCancel={onCancelHandler}
      />
    ) : (
      <button onClick={startEditingHandler}>Add New Expense</button>
    );
    return result;
  };

  return <div className="new-expense">{showContent()}</div>;
}
