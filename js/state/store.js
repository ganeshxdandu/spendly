const expense = {
  title: "Mahesh",
  category: "food",
  amount: 154,
  date: "2025-12-18"
};

const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
expenses.push(expense);

localStorage.setItem("expenses", JSON.stringify(expenses));

export { expenses };