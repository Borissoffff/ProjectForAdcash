import { UserDao } from "./DAO/UserDao.js";

const userDao = new UserDao();

const usersDiv = document.getElementById("users");

while (usersDiv !== null && usersDiv.hasChildNodes()) {
    usersDiv.removeChild(usersDiv.lastChild);
}

let users = await userDao.getAllUsers();

console.log(users);

for (const user of users) {
    addUserContainer(user);
}

const deleteButtons = document.querySelectorAll('#delete-user');
for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].onclick = function (e) {
        let userId = this.value;

        userDao.deleteUser(userId);

        window.location = "../index.html";
    }
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
            `<button onclick='window.location="../pages/show-loans.html?user=${user.id.toString()}"' class=\"inner-btn\">Show Loans</button><br>\n` +
            `<button onclick='window.location="../pages/add-loan.html?user=${user.id.toString()}"' class=\"inner-btn\">Add Loan</button>\n` +
            `<br><button id='delete-user' value="${user.id}" class=\"inner-btn delete-btn\">Delete User</button>\n` +
        "</div>";
    usersDiv.appendChild(userContainer);
}