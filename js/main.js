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
const pageNumberContainer = document.querySelector(".page-numbers");

const inputValues = {
  title: document.querySelector("#title"),
  category: document.querySelector("#category"),
  amount: document.querySelector("#amount"),
  date: document.querySelector("#date"),
};

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const MAX_ROWS = 10;
let currentPage = 1;

function renderApp() {
  if (expenses.length === 0) {
    emptyState.style.display = "flex";
    table.style.display = "none";
    pageNumberContainer.innerHTML = "";
  } else {
    emptyState.style.display = "none";
    table.style.display = "block";

    renderTable(expenses, currentPage);
    renderPagination(expenses);
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
    id: crypto.randomUUID(),
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

function renderTable(expenses, pageNumber = 1) {
  tableBody.innerHTML = "";

  const start = (pageNumber - 1) * MAX_ROWS;
  const end = pageNumber * MAX_ROWS;

  for (let i = start; i < end && i < expenses.length; i++) {
    tableBody.innerHTML += `
      <tr data-id = ${i}>
        <td>${expenses[i].date}</td>
        <td>${expenses[i].title}</td>
        <td>${expenses[i].category}</td>
        <td>${expenses[i].amount}</td>
        <td>
          <div class='actions'>
          <i class="ph ph-pencil-simple edit-expense"></i>
          <i class="ph ph-trash delete-expense"></i>
          </div>
        </td>
      </tr>
    `;
  }

  const actions = document.querySelectorAll(".actions");
  actions.forEach((element) => {
    element.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("delete-expense")) {
      let id = event.target.closest("tr").dataset.id;
      expenses.splice(id, id + 1);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderApp();
      console.log(id);
      
    }
  });
  })

  startLabel.textContent = expenses.length === 0 ? 0 : start + 1;
  endLabel.textContent = Math.min(end, expenses.length);
  totalLabel.textContent = expenses.length;
}

function renderPagination(expenses) {
  pageNumberContainer.innerHTML = "";

  const MAX_PAGES = 5;
  const totalPages = Math.ceil(expenses.length / MAX_ROWS);
  let currentSet = Math.floor(currentPage / MAX_PAGES) + 1;

  let pageStart = (currentSet - 1) * MAX_PAGES + 1;
  let endPage =
    currentSet * MAX_PAGES < totalPages ? currentSet * MAX_PAGES : totalPages;

  while (pageStart <= endPage) {
    const btn = document.createElement("button");
    btn.textContent = pageStart;

    if (pageStart === currentPage) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", (evt) => {
      evt.stopPropagation();
      currentPage = Number(evt.target.textContent);
      renderApp();
    });

    pageNumberContainer.appendChild(btn);
    pageStart++;
  }

  if (totalPages > 5) {
    const btn = document.createElement("button");
    btn.textContent = "...";
    pageNumberContainer.appendChild(btn);
  }
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
    currentPage = Math.ceil(expenses.length / MAX_ROWS);
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
