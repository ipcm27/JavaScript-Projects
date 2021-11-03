// SELECT ELEMENTS
const balanceElement = document.querySelector(".balance .value");
const incomeTotalElement = document.querySelector(".income-total");
const outcomeTotalElement = document.querySelector(".outcome-total");

const incomeElement = document.querySelector("#income");
const expenseElement = document.querySelector("#expense");
const allElement = document.querySelector("#all");

const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");

// SELECT BTNS
const expenseBtn = document.getElementById("expenseBtn");
const incomeBtn = document.getElementById("incomeBtn");
const allBtn = document.getElementById("allBtn");

const wishButton = document.getElementById("wishbtn");
const fixedCostButton = document.getElementById("fixedCostbtn");

// INPUT BTS
const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.getElementById("expense-title-input");
const expenseAmount = document.getElementById("expense-amount-input");

const addIncome = document.querySelector(".add-income");
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input");

//Variables
let ENTRY_LIST;
let balance = 0,
  income = 0,
  outcome = 0;
const Delete = "delete";
const Edit = "edit";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const chart = document.querySelector(".chart");
const R = 20;

// LOOK IF THERE IS SAVED DATA IN LOCALSTORAGE
ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list")) || [];
updateUI();

//CHART

canvas.width = 50;
canvas.height = 50;

chart.appendChild(canvas);

ctx.lineWidth = 8;

function drawCircle(color, ratio, anticlockwise) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(
    canvas.width / 2,
    canvas.height / 2,
    R,
    0,
    ratio * 2 * Math.PI,
    anticlockwise
  );
  ctx.stroke();
}

function updateChart(income, outcome) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let ratio = income / (income + outcome);

  drawCircle("#FFFFFF", ratio, true);
  drawCircle("#f0624d", 1 - ratio, false);
}
//Event Listners

const btns = [expenseBtn, incomeBtn, allBtn, wishButton, fixedCostButton];

expenseBtn.addEventListener("click", function () {
  show(expenseElement);
  hide([incomeElement, allElement]);
  active(expenseBtn);
  inactive([incomeBtn, allBtn]);
});

incomeBtn.addEventListener("click", function () {
  show(incomeElement);
  hide([expenseElement, allElement]);
  active(incomeBtn);
  inactive([expenseBtn, allBtn]);
});

allBtn.addEventListener("click", function () {
  show(allElement);
  hide([incomeElement, expenseElement]);
  active(allBtn);
  inactive([incomeBtn, expenseBtn]);
});

addExpense.addEventListener("click", function () {
  // IF ONE OF THE INPUTS IS EMPTY => EXIT
  if (!expenseTitle.value || !expenseAmount.value) return;

  // SAVE THE ENTRY TO ENTRY_LIST
  let expense = {
    type: "expense",
    title: expenseTitle.value,
    amount: parseInt(expenseAmount.value),
  };
  ENTRY_LIST.push(expense);

  updateUI();
  clearInput([expenseTitle, expenseAmount]);
});

addIncome.addEventListener("click", function () {
  if (!incomeTitle.value || !incomeAmount.value) return;

  let income = {
    type: "income",
    title: incomeTitle.value,
    amount: parseInt(incomeAmount.value),
  };
  ENTRY_LIST.push(income);

  updateUI();
  clearInput([expenseTitle, expenseAmount]);
});

incomeList.addEventListener("click", deleteOrEdit);
expenseList.addEventListener("click", deleteOrEdit);
allList.addEventListener("click", deleteOrEdit);

console.log("Wubba-lubba-dub-dub");

// Function HELPERS

function updateUI() {
  income = calculateTotal("income", ENTRY_LIST);
  outcome = calculateTotal("expense", ENTRY_LIST);
  balance = Math.abs(calculateBalance(income, outcome));

  //Determine sign of balance
  let sign = income >= outcome ? "$" : "-$";

  //Update UI
  balanceElement.innerHTML = `<small>${sign}</small>${balance}`;
  outcomeTotalElement.innerHTML = `<small>$</small>${outcome}`;
  incomeTotalElement.innerHTML = `<small>$</small>${income}`;

  clearElement([expenseList, incomeList, allList]);

  ENTRY_LIST.forEach((entry, index) => {
    if (entry.type == "expense") {
      showEntry(expenseList, entry.type, entry.title, entry.amount, index);
    } else if (entry.type == "income") {
      showEntry(incomeList, entry.type, entry.title, entry.amount, index);
    }
    showEntry(allList, entry.type, entry.title, entry.amount, index);
  });

  updateChart(income, outcome);

  localStorage.setItem("entry_list", JSON.stringify(ENTRY_LIST));
}

function clearElement(elements) {
  elements.forEach((elements) => {
    elements.innerHTML = "";
  });
}

function calculateTotal(type, list) {
  let sum = 0;
  list.forEach((entry) => {
    if (entry.type == type) {
      sum += entry.amount;
    }
  });

  return sum;
}

function calculateBalance(income, outcome) {
  return income - outcome;
}

function deleteEntry(entry) {
  ENTRY_LIST.splice(entry.id, 1);

  updateUI();
}

function deleteOrEdit(event) {
  const targetBtn = event.target;

  const entry = targetBtn.parentNode;

  if (targetBtn.id == Delete) {
    deleteEntry(entry);
  } else if (targetBtn.id == Edit) {
    editEntry(entry);
  }
}

function editEntry(entry) {
  console.log(entry);
  let ENTRY = ENTRY_LIST[entry.id];

  if (ENTRY.type == "income") {
    incomeAmount.value = ENTRY.amount;
    incomeTitle.value = ENTRY.title;
  } else if (ENTRY.type == "expense") {
    expenseAmount.value = ENTRY.amount;
    expenseTitle.value = ENTRY.title;
  }

  deleteEntry(entry);
}

function showEntry(list, type, title, amount, id) {
  const entry = `<li id ="${id}" class="${type}">
                    <div class="entry"> ${title}: $${amount}</div>
                    <div id="edit"></div>
                    <div id="delete"></div>
                  </li>`;
  const position = "afterbegin";

  list.insertAdjacentHTML(position, entry);
}

function clearInput(inputs) {
  inputs.forEach((input) => {
    input.value = "";
  });
}
// Visual HELPERS

function show(element) {
  element.classList.remove("hide");
}

function hide(elements) {
  elements.forEach((element) => {
    element.classList.add("hide");
  });
}

function active(element) {
  element.classList.add("active");
}

function inactive(elements) {
  elements.forEach((element) => {
    element.classList.remove("active");
  });
}
