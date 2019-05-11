/* eslint-disable no-undef */

// Name in menu bar
const name = document.getElementById('userName');
const userDetails = JSON.parse(localStorage.getItem('userDetails'));
name.innerText = `${userDetails[0].firstName} ${userDetails[0].lastName}`;

// Transactions
const firstAccount = JSON.parse(localStorage.getItem('firstAccount'));

const { accountNumber } = firstAccount;
const bearer = `Bearer ${userDetails[0].token}`;
const table = document.getElementsByClassName('savings_transaction_table');
const url = `https://pelumi-banka.herokuapp.com/api/v1/accounts/${accountNumber}/transactions`;
const loadTransactions = () => {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,

    },
    method: 'GET',
  })
    .then(res => res.json())
    .then((response) => {
      let html = `
        <div class="row header">
        <div class="cell">Date</div>
        <div class="cell">Account Number</div>
        <div class="cell">Credit</div>
        <div class="cell">Debit</div>
        <div class="cell">Amount</div>
        <div class="cell">Balance</div>
        </div>
      `;
      const transactions = response.data;
      const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
      });
      transactions.forEach((trans) => {
        const credit = trans.type === 'credit' ? formatter.format(trans.amount) : '-';
        const debit = trans.type === 'debit' ? formatter.format(trans.amount) : '-';
        const transDate = new Date(trans.createdOn);
        const formattedDate = `${transDate.getDate()}-${transDate.getMonth() + 1}-${transDate.getFullYear()}`;


        html += `
        <div class="row">
        <div class="cell">${formattedDate}</div>
        <div class="cell">${trans.accountNumber}</div>
        <div class="cell">${credit}</div>
        <div class="cell">${debit}</div>
        <div class="cell">${formatter.format(trans.amount)}</div>
        <div class="cell">${formatter.format(trans.newBalance)}</div>
    </div>
        `;
      });
      table[0].innerHTML = html;
    });
};

loadTransactions();
