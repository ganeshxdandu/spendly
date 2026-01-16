const emptyState = document.querySelector(".empty-state");
const table = document.querySelector(".table");
const tableBody = document.querySelector("tbody");
const addExpenseBtn = document.querySelector(".add-expense");
const overlay = document.querySelector(".overlay");
const addExpenseModal = document.querySelector(".add-expense-form .container");
const formTitle = document.querySelector(".form-title");
const cancelExpenseBtn = document.querySelector(".cancel-expense");
const submitExpenseBtn = document.querySelector(".submit-expense");
const errorMsg = document.querySelector(".error-msg");
const errorContainer = document.querySelector(".error-container");
const startLabel = document.querySelector(".start");
const endLabel = document.querySelector(".end");
const totalLabel = document.querySelector(".total");

const inputValues = {
  title: document.querySelector("#title"),
  category: document.querySelector("#category"),
  amount: document.querySelector("#amount"),
  date: document.querySelector("#date"),
};

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function renderApp() {
  if (expenses.length === 0) {
    emptyState.style.display = "flex";
    table.style.display = "none";
  } else {
    emptyState.style.display = "none";
    table.style.display = "block";
    renderTable(expenses);
  }
}

function openModal(target) {
  if (target.classList.contains("add-expense")) {
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";
    addExpenseModal.style.right = "0";
    formTitle.textContent = "Add New Expense";
  } else {
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";
    addExpenseModal.style.right = "0";
    formTitle.textContent = "Edit Expense";
  }
}

function getExpense() {
  return {
    title: inputValues.title.value,
    category: inputValues.category.value,
    amount: inputValues.amount.value,
    date: inputValues.date.value,
  };
}

function isValid() {
  if (inputValues.title.value === "") return false;
  if (inputValues.category.value === "") return false;
  if (inputValues.amount.value === "" || Number(inputValues.amount.value) <= 0)
    return false;
  if (inputValues.date.value === "") return false;
  return true;
}

function closeModal() {
  overlay.style.visibility = "hidden";
  overlay.style.opacity = "0";
  addExpenseModal.style.right = "-300px";
}

function renderTable(expenses, pageNumber = 2) {
  const MAX_ROWS = 10;

  tableBody.innerHTML = "";
  for (
    let i = (pageNumber - 1) * MAX_ROWS;
    i < pageNumber * MAX_ROWS && i < expenses.length;
    i++
  ) {
    tableBody.innerHTML += `<tr>
                            <td>${expenses[i].date}</td>
                            <td>${expenses[i].title}</td>
                            <td>${expenses[i].category}</td>
                            <td>${expenses[i].amount}</td>
                            <td>
                                <i class="ph ph-pencil-simple"></i>
                                <i class="ph ph-trash"></i>
                            </td>
                        </tr>`;
  }

  startLabel.textContent = (pageNumber - 1) * MAX_ROWS + 1;
  endLabel.textContent =
    pageNumber * MAX_ROWS > expenses.length
      ? expenses.length
      : pageNumber * MAX_ROWS;
  totalLabel.textContent = expenses.length;
}

addExpenseBtn.addEventListener("click", (event) => {
  openModal(event.target);
});

cancelExpenseBtn.addEventListener("click", () => {
  closeModal();
});

overlay.addEventListener("click", (event) => {
  event.stopPropagation();
  closeModal();
});

submitExpenseBtn.addEventListener("click", () => {
  if (isValid()) {
    let expense = getExpense();
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderApp();
    document.querySelector("#expense-form").reset();
    closeModal();
  } else {
    const errorMsg = document.createElement("div");
    errorMsg.className = "error-msg";
    errorMsg.classList.add("shake");
    errorMsg.textContent = "please fill all fields!!!";
    errorContainer.appendChild(errorMsg);

    errorMsg.addEventListener("animationend", () => {
      errorMsg.remove();
    });
  }
});

renderApp();
