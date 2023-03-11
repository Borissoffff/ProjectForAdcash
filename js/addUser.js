import { User } from "./classes/User.js";
import { UserDao } from "./DAO/UserDao.js";

const userDao = new UserDao();

const btn = document.getElementById("btn");

const warningText = document.getElementById('warning');
warningText.innerText = "";

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const user = createUserObject();
    if (user) {
        warningText.innerText = "";
        if (!validateEmail(user.email)) {
            warningText.innerText += "Wrong email format\n";
        } else if (!validatePhone(user.phone)) {
            warningText.innerText += "Wrong phone number format\n";
        } else {
            await userDao.saveUser(user);
            window.location = "../index.html";
        }
    }
})

function createUserObject() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const personalId = document.getElementById('idcode').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (firstName === ""
        || lastName === ""
        || personalId === ""
        || age === ""
        || email === ""
        || phone === "")
    {
        document.getElementById('warning').innerText = "All fields have to be filled!";
        return false;
    } else {
        return new User(firstName, lastName, personalId, age, email, phone);
    }
}

function validateEmail (email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function validatePhone (phone) {
    return String(phone)
        .toLowerCase()
        .match(
            /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
        );
}