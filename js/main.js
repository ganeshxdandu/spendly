var addExpenseBtn = document.querySelector(".add-expense");
var overlay = document.querySelector(".overlay");
var addExpenseForm = document.querySelector(".add-expense-form .container");
var cancelExpenseBtn = document.querySelector('.cancel-expense');
var submitExpenseBtn = document.querySelector('.submit-expense');

function openModal() {
    overlay.style.opacity = '1';
    overlay.style.visibility = 'visible';
    addExpenseForm.style.right = '0px';
}

function closeModal() {
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    addExpenseForm.style.right = '-300px';
}

addExpenseBtn.addEventListener('click', (evt) => {
    openModal(evt);
});

overlay.addEventListener('click', (evt) => {
    evt.stopPropagation();
    closeModal(evt);
});

cancelExpenseBtn.addEventListener('click', (evt) => {
    closeModal(evt);
})