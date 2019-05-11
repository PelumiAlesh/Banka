/* eslint-disable no-undef */

const firstAccountT = JSON.parse(localStorage.getItem('firstAccount'));

const { accountNumber } = firstAccountT;
const bearer = `Bearer ${userDetails[0].token}`;
const table = document.getElementsByClassName('table_body');
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
      let html = '';
      const transactions = response.data;

      transactions.forEach((trans) => {
        const type = trans.type === 'credit' ? 'recieved' : 'sent';
        const transDate = new Date(trans.createdOn);
        const formattedDate = `${transDate.getDate()}-${transDate.getMonth() + 1}-${transDate.getFullYear()}`;
        const formatter = new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
        });

        html += `
        <div class="row">
        <p class="column">${formattedDate}</p>
        <p class="column">${trans.accountNumber}</p>
        <p class="column">${formatter.format(trans.newBalance)}</p>
        <p class="column amt" id="${type}">${formatter.format(trans.amount)}</p>
        </div>
        `;
      });
      table[0].innerHTML = html;
    });
};

loadTransactions();
