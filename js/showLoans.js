import { getHrefAttribute } from './functions.js';
import {UserDao} from "./DAO/UserDao.js";
import {LoanDao} from "./DAO/LoanDao.js";

const loanDao = new LoanDao();
const userDao = new UserDao();

const userId = getHrefAttribute('user');

const loansDiv = document.getElementById("loans");

if (userId) {
    showUserLoans();
} else {
    showAllLoans();
}

async function showAllLoans() {

    while (loansDiv !== null && loansDiv.hasChildNodes()) {
        loansDiv.removeChild(loansDiv.lastChild);
    }
    let loans = await loanDao.getAllLoans();

    for (const loan of loans) {
        let user = await userDao.getUserById(loan.userId);
        await addLoanContainer(loan, user);
    }
    activateDeleteButtons();
}

async function showUserLoans() {
    while (loansDiv !== null && loansDiv.hasChildNodes()) {
        loansDiv.removeChild(loansDiv.lastChild);
    }
    let user = await userDao.getUserById(userId);
    let loans = await loanDao.getLoansByUserId(userId);

    for (const loan of loans) {
        await addLoanContainer(loan, user);
    }
    let names =  document.querySelectorAll('.loan-user');
    for (const name of names) {
        name.style.display = "none";
    }
    document.getElementById('loan-info-label').innerText += ` of ${user.firstName} ${user.lastName}`;

    activateDeleteButtons();
}

function addLoanContainer(loan, user) {

    const loanContainer = document.createElement('div');
    loanContainer.classList.add('loan-container');
    loanContainer.innerHTML =
        "<div class=\"loan-info\">\n" +
            `<div class=\"loan-user\"><b>Borrower:</b> ${user.firstName} ${user.lastName}</div>\n` +
            `<div><b>Loan Title:</b> ${loan.name}</div>\n` +
            `<div><b>Loan Amount:</b> ${loan.amount}&euro;</div>\n` +
            `<div><b>Months:</b> ${loan.months}</div>\n` +
            `<div><b>Interest:</b> 5%</div>\n` +
            `<div><b>Loan was taken:</b> ${loan.wasTaken}</div>\n` +
            `<div><b>Return Amount:</b> ${loan.fullReturn}&euro;</div>\n` +
            `<div><b>Return Monthly:</b> ${loan.monthlyReturn}&euro;</div>\n` +
            `<div><b>Term:</b> ${loan.term}</div>\n` +
        "</div>\n" +
        `<button id='delete-loan' value='${loan.id}' class=\"inner-btn delete-btn\">Delete Loan</button><br>\n`;
        loansDiv.appendChild(loanContainer);
}

function activateDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    console.log(deleteButtons);
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].onclick = function () {
            let loanId = this.value;

            loanDao.deleteLoanById(loanId);

            window.location = "../index.html";
        }
    }
}