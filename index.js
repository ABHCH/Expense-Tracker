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

// when app is loaded on the screen 
window.addEventListener("DOMContentLoaded", () => {
  walletBalance.innerHTML = `Wallet <i class="fa-solid fa-wallet"></i>: ${walletMoney}`;
  incomeSec.innerHTML = `Income <i class="fa-solid fa-dollar-sign"></i> : ${incomeAmount}`;
  expenseSec.innerHTML = `Expense <i class="fa-solid fa-dollar-sign"></i> : ${ExpenseAmount}`;
});

// adding Pocket Money function
const walletMoneyAdd = () => {
    walletMoney = Number(
      prompt("Please Add your Pocket Money First Then go Ahead 🙏")
    );
    incomeAmount = 0;
    ExpenseAmount = 0;
    walletBalance.innerHTML = `Wallet <i class="fa-solid fa-wallet"></i>: ${walletMoney}`;
    incomeSec.innerHTML = `Income <i class="fa-solid fa-dollar-sign"></i> : ${incomeAmount}`;
    expenseSec.innerHTML = `Expense <i class="fa-solid fa-dollar-sign"></i> : ${ExpenseAmount}`;
    listContainer.innerHTML = " ";
  };

/// CALCUALTING INCOME AMOUNT
const incMoney = function (myArray) {
  const incAmount = myArray
    .filter((x) => {
      return x > 0;
    })
    .reduce((a, b) => a + b);
  return incAmount;
};

// calculating Expense AMOUNT
const expMoney = function (myArray) {
  const exptAmt = myArray
    .filter((x) => {
      return x < 0;
    })
    .reduce((a, b) => a + b);
  return exptAmt;
};


// OpenModal Function
const openModal = () => {
  modalContainer.classList.add("active-modal");
  mainContainer.classList.add("active-main");
};
//CLOSE MODAL SECTION
const closeModal = () => {
  modalContainer.classList.remove("active-modal");
  mainContainer.classList.remove("active-main");
};

/// ADDING INCOME AMMMOUNT AND SHOW 
const addIncomeAmount = () => {
  if (walletMoney === 0) {
    walletMoneyAdd();
  } else if (userVal.value === "" || userAmt.value === "") {
    Message();
  } else {
    AmountArray.push(Number(userAmt.value));
    incomeAmount = incMoney(AmountArray);
    const html = ` <div class="income-section">
         <div class="income-name">${userVal.value}</div>
         <div class="income-details">
             <div class="income-amount">INC : ${userAmt.value}</div>
             <i onclick="delte()" class="fa-solid fa-trash"></i>
         </div>
         </div>`;
    listContainer.insertAdjacentHTML("beforeend", html);
    modalContainer.classList.remove("active-modal");
    mainContainer.classList.remove("active-main");
    incomeSec.innerHTML = `Income <i class="fa-solid fa-dollar-sign"></i> : ${incomeAmount}`;
    walletBalance.innerHTML = `Wallet <i class="fa-solid fa-wallet"></i>: ${
      walletMoney + incomeAmount
    }`;
    userAmt.value = "";
    userVal.value = "";
  }
};

///// ADDING EXPENSES AREA
const addExpenseAmount = () => {
  if (walletMoney === 0) {
    walletMoneyAdd();
  } else if (userVal.value === "" || userAmt.value === "") {
    Message();
  } else {
    AmountArray.push(Number(-userAmt.value));
    ExpenseAmount = expMoney(AmountArray);
    let final = walletMoney + incomeAmount + ExpenseAmount;
    if (final > 0) {
      const html = ` <div class="income-section">
        <div class="income-name">${userVal.value}</div>
        <div class="income-details">
            <div class="income-amount">EXP : ${userAmt.value}</div>
            <i onclick="delte()" class="fa-solid fa-trash"></i>
        </div>
        </div>`;
      listContainer.insertAdjacentHTML("beforeend", html);
      modalContainer.classList.remove("active-modal");
      mainContainer.classList.remove("active-main");
      expenseSec.innerHTML = `Expense <i class="fa-solid fa-dollar-sign"></i> : ${ExpenseAmount}`;
      walletBalance.innerHTML = `Wallet <i class="fa-solid fa-wallet"></i>: ${final}`;
      userAmt.value = "";
      userVal.value = "";
    } else if (final === 0) {
      alert(
        "Your account is Empty After this Transaction Are your sure ?  Please click ok"
      );
      modalContainer.classList.remove("active-modal");
      mainContainer.classList.remove("active-main");
      walletBalance.innerHTML = `Wallet <i class="fa-solid fa-wallet"></i>: ${final}`;
    } else {
      alert(
        "OOPS ! Your account have Insffuicent Fund for this Transaction 🥲"
      );
      modalContainer.classList.remove("active-modal");
      mainContainer.classList.remove("active-main");
    }
  }
};

pocketmoneyBtn.addEventListener("click", walletMoneyAdd);
mainButton.addEventListener("click", openModal);
trashBtn.addEventListener("click", closeModal);
incomeBtn.addEventListener("click", addIncomeAmount);
expenseBtn.addEventListener("click", addExpenseAmount);
