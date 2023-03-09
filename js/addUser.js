import { User } from "./classes/User.js";
import { UserDao } from "./DAO/UserDao.js";

const userDao = new UserDao();

const btn = document.getElementById("btn");

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const user = createUserObject();
    console.log(user);

    await userDao.saveUser(user);

    window.location = "../index.html";

})

function createUserObject() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const personalId = document.getElementById('idcode').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    return new User(firstName, lastName, personalId, age, email, phone);
}