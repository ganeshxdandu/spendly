const emptyState = document.querySelector('.empty-state');
const table = document.querySelector('.table');
const tableBody = document.querySelector('tbody');
const addExpenseBtn = document.querySelector('.add-expense');
const overlay = document.querySelector('.overlay');
const addExpenseModal = document.querySelector('.add-expense-form .container');
const formTitle = document.querySelector('.form-title');
const cancelExpenseBtn = document.querySelector('.cancel-expense');
const submitExpenseBtn = document.querySelector('.submit-expense');
const errorMsg = document.querySelector('.error-msg');

const inputValues = {
    title : document.querySelector('#title'),
    category : document.querySelector('#category'),
    amount : document.querySelector("#amount"),
    date : document.querySelector('#date')
}

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function openModal(target){
    if(target.classList.contains('add-expense')){
        overlay.style.visibility = 'visible';
        overlay.style.opacity = '1';
        addExpenseModal.style.right = '0';
        formTitle.textContent = "Add New Expense";
    } else {
        overlay.style.visibility = 'visible';
        overlay.style.opacity = '1';
        addExpenseModal.style.right = '0';
        formTitle.textContent = "Edit Expense";
    }
}

function closeModal(){
    overlay.style.visibility = 'hidden';
    overlay.style.opacity = '0';
    addExpenseModal.style.right = '-300px';
}

function renderApp(){
    if(expenses.length === 0){
        emptyState.style.display = 'flex';
        table.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        table.style.display = 'block';
    }
}

function getExpense(){
    return {
        title : inputValues.title.value,
        category : inputValues.category.value,
        amount : inputValues.amount.value,
        date : inputValues.date.value
    }
}

function isValid(){
    if(inputValues.title.value === '') return false;
    if(inputValues.category.value === '') return false;
    if(inputValues.amount.value === '' || Number(inputValues.amount.value) <= 0) return false;
    if(inputValues.date.value === '') return false;
    return true;
}

addExpenseBtn.addEventListener('click', (event) => {
    openModal(event.target)
});

cancelExpenseBtn.addEventListener('click', () => {
    closeModal();
});

overlay.addEventListener('click', (event) => {
    event.stopPropagation();
    closeModal();
});

submitExpenseBtn.addEventListener('click', () => {
    if (isValid()) {
        let expense = getExpense();
        expenses.push(expense);
        // renderTable(data);
        Object.values(inputValues).forEach(input => {
            input.value = '';
        });

    } else {
        errorMsg.style.opacity = '1';

        errorMsg.classList.remove('shake'); 
        void errorMsg.offsetWidth;           
        errorMsg.classList.add('shake');    

        setTimeout(() => {
            errorMsg.style.opacity = '0';
        }, 1000);
    }
});



renderApp();