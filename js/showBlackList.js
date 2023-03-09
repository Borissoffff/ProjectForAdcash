import { BlackListDao } from "./DAO/BlackListDao.js";

const blackListDao = new BlackListDao();

const blackListDiv = document.getElementById("black-list");

while (blackListDiv !== null && blackListDiv.hasChildNodes()) {
    blackListDiv.removeChild(blackListDiv.lastChild);
}

let users = await blackListDao.getBlackListUsers();

console.log(users);

for (const user of users) {
    addUserContainer(user);
}

function addUserContainer(user) {
    const userContainer = document.createElement('div');
    userContainer.classList.add('user-container');
    userContainer.innerHTML =
        "<div class=\"user-info\">\n" +
        `<div>Personal ID: ${user.personalId}</div>\n`+
        `<div>First Name: ${user.firstName}</div>\n`+
        `<div>Last Name: ${user.lastName}</div>\n`+
        `<div>Age: ${user.age}</div>\n`+
        `<div>Email: ${user.email}</div>\n`+
        `<div>Phone Number: ${user.phone}</div>\n`+
        "</div>\n" +
        "<div>\n" +
/*        `<button onclick='window.location="../pages/show-loans.html?user=${user.id.toString()}"' class=\"inner-btn\">Show Loans</button><br>\n` +
        `<button onclick='window.location="../pages/add-loan.html?user=${user.id.toString()}"' class=\"inner-btn\">Add Loan</button>\n` +*/
        "</div>"
    ;
    blackListDiv.appendChild(userContainer);
}