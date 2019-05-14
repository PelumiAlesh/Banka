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

const Useremail = userDetails[0].email;
const url = `https://pelumi-banka.herokuapp.com/api/v1/user/${Useremail}/accounts`;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJheW9AZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiYXlvIiwibGFzdE5hbWUiOiJhbGVzaCIsInBhc3N3b3JkIjoiJDJiJDEwJEx5SUp6R3FKbjd5NDNvZzU3NG5LNS5pcmR6T3kzSjJXWWVTUVBKN0NxdmhOWi5ObkI3QVAuIiwidHlwZSI6InN0YWZmIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU1NzQxMTI0MiwiZXhwIjoxODgxNDExMjQyfQ.4OsSAw3VI0-fN1Nf9KRLaVowXRqtaQ9lSZLITMDt0Do';
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
};
fetch(url, options)
  .then(res => res.json())
  .then((response) => {
    if (response.error) {
      const x = document.getElementById('snackbar');
      x.innerText = 'Something Went Wrong!...';
      x.className = 'show';
      setTimeout(() => { x.className = x.className.replace('show', ''); }, 3000);
    }
    if (response.status === 200) {
      const { accounts } = response;
      const firstAccount = accounts[0];
      localStorage.setItem('accountDetail', JSON.stringify(accounts[0]));

      // Account Details
      const x = `${firstAccount.accountNumber}`;
      const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
      });

      const balance = formatter.format(firstAccount.balance);
      acctNum.innerText = `${x[0]}${x[1]}${x[2]} ${x[3]}${x[4]}${x[5]} ${x[6]}${x[7]}${x[8]}${x[9]}`;
      mainBal.innerHTML = `${balance}<sup>₦</sup>`;
      acctType.innerText = `${firstAccount.type} Account`;
    }
  });

// User details
name.innerText = `${userDetails[0].firstName} ${userDetails[0].lastName}`;
firstName.innerText = userDetails[0].firstName;
email[1].placeholder = userDetails[0].email;
email[0].innerText = userDetails[0].email;
