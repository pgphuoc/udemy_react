import React from "react";
import Chart from "../../Chart/Chart";

export default function ExpenseChart(props) {
  const chartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Fed", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  console.log(props.expenses);

  for (let expense of props.expenses) {
    console.log("Loop : " + expense);
    const expensesMonth = expense.date.getMonth();
    chartDataPoints[expensesMonth].value += expense.amount;
  }

  return <Chart dataPoints={chartDataPoints} />;
}
