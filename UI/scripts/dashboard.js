/* eslint-disable no-undef */

// ---- User details
const name = document.getElementById('userName');
const firstName = document.getElementById('firstName');
const email = document.getElementsByClassName('userEmail');
const userDetails = JSON.parse(localStorage.getItem('userDetails'));

// Account Details
const acctNum = document.getElementById('acct_num');
const mainBal = document.getElementById('main_bal');
const acctType = document.getElementById('card_type');
const firstAccount = JSON.parse(localStorage.getItem('firstAccount'));

// User details
name.innerText = `${userDetails[0].firstName} ${userDetails[0].lastName}`;
firstName.innerText = userDetails[0].firstName;
email[1].placeholder = userDetails[0].email;
email[0].innerText = userDetails[0].email;

// Account Details
const x = `${firstAccount.accountNumber}`;
const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
});
const balance = formatter.format(firstAccount.openingBalance);
acctNum.innerText = `${x[0]}${x[1]}${x[2]} ${x[3]}${x[4]}${x[5]} ${x[6]}${x[7]}${x[8]}${x[9]}`;
mainBal.innerHTML = `${balance}<sup>₦</sup>`;
acctType.innerText = `${firstAccount.type} Account`;
