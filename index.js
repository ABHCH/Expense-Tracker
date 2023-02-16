// selectors

const walletBalance = document.querySelector(".pocket-money");
const pocketmoneyBtn = document.querySelector(".set-pocket-money");
const incomeSec = document.querySelector(".income-sec");
const expenseSec = document.querySelector(".expense-sec");
const listContainer = document.querySelector(".expense-track-list");
const trashBtn = document.querySelector(".trash-btn");
const mainContainer = document.getElementById("main");
const modalContainer = document.querySelector(".modal-container");
const mainButton = document.querySelector(".add-expense");
const incomeBtn = document.querySelector(".income-btn");
const expenseBtn = document.querySelector(".expense-btn");
const userVal = document.querySelector("#type-of-expense");
const userAmt = document.querySelector("#type-of-amount");

let walletMoney = 0;
let incomeAmount = 0;
let ExpenseAmount = 0;
const AmountArray = [];

window.addEventListener("DOMContentLoaded", () => {
  walletBalance.innerHTML = `Wallet <i class="fa-solid fa-wallet"></i>: ${walletMoney}`;
  incomeSec.innerHTML = `Income <i class="fa-solid fa-dollar-sign"></i> : ${incomeAmount}`;
  expenseSec.innerHTML = `Expense <i class="fa-solid fa-dollar-sign"></i> : ${ExpenseAmount}`;
});

const walletMoneyAdd = () => {
  walletMoney = Number(prompt("Please set your monthly Pocket Money Balance"));
  walletBalance.innerHTML = `Wallet <i class="fa-solid fa-wallet"></i>: ${walletMoney}`;
  console.log(walletMoney);
};

// Adding Income into the list

const addIncomeAmount = () => {
  if (walletMoney === 0) {
    alert("Please adding the Pocket Money first then go ahead 🙏");
  } else if (userVal.value === "" || userAmt.value === "") {
    alert("Please Adding Expense Name or Amount 🙏");
  } else {
    AmountArray.push(Number(userAmt.value));

    const incAmt = AmountArray.filter((x) => {
      return x > 0;
    }).reduce((a, b) => a + b, 0);
    incomeAmount = incAmt;
    const html = ` <div class="income-section">
        <div class="income-name">${userVal.value}</div>
        <div class="income-details">
            <div class="income-amount">INC : ${userAmt.value}</div>
            <i  class="fa-solid fa-trash"></i>
        </div>
    </div>`;
    listContainer.insertAdjacentHTML("beforeend", html);
    modalContainer.classList.remove("active-modal");
    mainContainer.classList.remove("active-main");
    incomeSec.innerHTML = `Income <i class="fa-solid fa-dollar-sign"></i> : ${incomeAmount}`;
    walletBalance.innerHTML = `Wallet <i class="fa-solid fa-wallet"></i>: ${
      walletMoney + incomeAmount
    }`;
  }
};

// rechecking all the code;
const addExpenseAmount = () => {
  if (walletMoney === 0) {
    alert("Please adding the Pocket Money first then go ahead 🙏");
  } else if (userVal.value === "" || userAmt.value === "") {
    alert("Please Adding Expense Name or Amount 🙏");
  } else {
    AmountArray.push(Number(-userAmt.value));
    const expAmt = AmountArray.filter((x) => {
      return x < 0;
    }).reduce((a, b) => a + b, 0);

    ExpenseAmount = expAmt;
    walletMoney = walletMoney + incomeAmount - ExpenseAmount;
    if (walletMoney > -1) {
      const html = ` <div class="expense-section">
        <div class="expense-name">${userVal.value}</div>
        <div class="expense-details">
            <div class="expense-amount">EXP : ${userAmt.value}</div>
            <i  class="fa-solid fa-trash"></i>
        </div>
    </div>`;
      listContainer.insertAdjacentHTML("beforeend", html);
      modalContainer.classList.remove("active-modal");
      mainContainer.classList.remove("active-main");
      expenseSec.innerHTML = `Expense <i class="fa-solid fa-dollar-sign"></i> : -${ExpenseAmount}`;
      walletBalance.innerHTML = `Wallet <i class="fa-solid fa-wallet"></i>: ${walletMoney}`;
    } else {
      alert("Please bro");
    }
  }
};


const openModal = () => {
  modalContainer.classList.add("active-modal");
  mainContainer.classList.add("active-main");
};

const closeModal = () => {
  modalContainer.classList.remove("active-modal");
  mainContainer.classList.remove("active-main");
};


pocketmoneyBtn.addEventListener("click", walletMoneyAdd);
trashBtn.addEventListener("click", closeModal);
mainButton.addEventListener("click", openModal);
incomeBtn.addEventListener("click", addIncomeAmount);
expenseBtn.addEventListener("click", addExpenseAmount);
