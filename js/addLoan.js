import { Loan } from './classes/Loan.js';
import { LoanDao } from './DAO/LoanDao.js';
import { BlackListDao } from './DAO/BlackListDao.js';
import { getHrefAttribute } from './functions.js';

const loanDao = new LoanDao();
const blackListDao = new BlackListDao();

const addLoanBtn = document.getElementById("addLoan");
const calculateLoanBtn = document.getElementById("calculateLoan");
const loanCalculationsection = document.getElementById('loan-calculation');

const userId = getHrefAttribute('user');

let userStatus = await blackListDao.getBlackListUserById(userId);

if (userStatus.status === 'denied') {
    disableInputs();
    document.getElementById('loan-denied-text').innerText
        = "You cannot take more loans. \nYou have taken to much loans within 24 hours"
}

addLoanBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const loan = createLoanObject();

    await loanDao.saveLoan(loan);

    window.location = "../index.html";
})

calculateLoanBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    loanCalculationsection.style.display = "none";
    document.getElementById('total-loan').innerText = "";
    document.getElementById('monthly-loan').innerText = "";

    const amount = parseInt(document.getElementById('loanAmount').value);
    const months = parseInt(document.getElementById('months').value);

    console.log(amount);
    console.log(months);

    let fullReturn = amount + amount * 0.05;
    fullReturn = Math.round(fullReturn * 100) / 100;

    let eachMonth = amount / months;
    let monthlyReturn = eachMonth + eachMonth * 0.05;
    monthlyReturn = Math.round(monthlyReturn * 100) / 100;

    document.getElementById('total-loan').innerText += "Total amount of refund:  " + fullReturn + "€";
    document.getElementById('monthly-loan').innerText += "Monthly amount of refund:  " + monthlyReturn + "€";
    loanCalculationsection.style.display = "unset";
})

function createLoanObject() {
    const name = document.getElementById('loanName').value;
    const amount = document.getElementById('loanAmount').value;
    const term = document.getElementById('term').value;
    const months = document.getElementById('months').value;

    return new Loan(userId, name, amount, term, months);
}

function disableInputs() {
    document.getElementById('loanName').disabled = true;
    document.getElementById('loanAmount').disabled = true;
    document.getElementById('term').disabled = true;
    document.getElementById('months').disabled = true;
    addLoanBtn.disabled = true;
    calculateLoanBtn.disabled = true;
}