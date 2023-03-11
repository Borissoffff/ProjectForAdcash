import { Loan } from './classes/Loan.js';
import { LoanDao } from './DAO/LoanDao.js';
import { BlackListDao } from './DAO/BlackListDao.js';
import { getHrefAttribute } from './functions.js';

const loanDao = new LoanDao();
const blackListDao = new BlackListDao();

const addLoanBtn = document.getElementById("addLoan");
const calculateLoanBtn = document.getElementById("calculateLoan");
const loanCalculationSection = document.getElementById('loan-calculation');

const nameField = document.getElementById('loanName');
const amountField = document.getElementById('loanAmount');
const termField = document.getElementById('term');
const monthsField = document.getElementById('months');

const totalLoanField = document.getElementById('total-loan');
const monthlyLoanField = document.getElementById('monthly-loan');

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

    if (loan) {
        await loanDao.saveLoan(loan);

        window.location = "../index.html";
    }
})

calculateLoanBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    loanCalculationSection.style.display = "none";

    totalLoanField.innerText = "";
    monthlyLoanField.innerText = "";

    const amount = parseInt(amountField.value);
    const months = parseInt(monthsField.value);

    let fullReturn = amount + amount * 0.05;
    fullReturn = Math.round(fullReturn * 100) / 100;

    let eachMonth = amount / months;
    let monthlyReturn = eachMonth + eachMonth * 0.05;
    monthlyReturn = Math.round(monthlyReturn * 100) / 100;

    totalLoanField.innerText += "Total amount of refund:  " + fullReturn + "€";
    monthlyLoanField.innerText += "Monthly amount of refund:  " + monthlyReturn + "€";

    loanCalculationSection.style.display = "unset";
})

function createLoanObject() {
    const name = nameField.value;
    const amount = amountField.value;
    const term = termField.value;
    const months = monthsField.value;

    if (name === "" || amount === "" || term === "" || months === "") {
        document.getElementById('warning').innerText = "All fields have to be filled!";
        return false;
    } else {
        return new Loan(userId, name, amount, term, months);
    }
}

function disableInputs() {
    nameField.disabled = true;
    amountField.disabled = true;
    termField.disabled = true;
    monthsField.disabled = true;
    addLoanBtn.disabled = true;
    calculateLoanBtn.disabled = true;
}