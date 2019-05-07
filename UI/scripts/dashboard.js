/* eslint-disable no-undef */
const name = document.getElementById('userName');
const firstName = document.getElementById('firstName');
const email = document.getElementsByClassName('userEmail');
const userDetails = JSON.parse(localStorage.getItem('userDetails'));
console.log(userDetails[0]);

console.log(name);
name.innerText = `${userDetails[0].firstName} ${userDetails[0].lastName}`;
firstName.innerText = userDetails[0].firstName;
email[0].innerText = userDetails[0].email;
