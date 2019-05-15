/* eslint-disable no-undef */
const clickedInfo = JSON.parse((sessionStorage.getItem('clickedEmail')));
const userDetails = JSON.parse(localStorage.getItem('userDetails'));

const clickEmail = document.getElementById('clickEmail');
const clickNo = document.getElementsByClassName('clickNo');
const clickAcctNo = document.getElementById('acctNo');
const clickTable = document.getElementsByClassName('table_body');
const bearer = `Bearer ${userDetails[0].token}`;
clickEmail.innerText = clickedInfo.email;
clickNo[0].innerText = `Account No: ${clickedInfo.acctNo}`;

// Fetch function
function fetchData() {
  fetch(`https://pelumi-banka.herokuapp.com/api/v1/user/${clickedInfo.email}/accounts`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    method: 'GET',
  })
    .then(res => res.json())
    .then((response) => {
      let selectHTML = '<option value="Acct No">Acct No</option>';
      let tableHTML = '';

      response.accounts.forEach((account) => {
        const color = account.status === 'active' ? 'green' : 'red';
        selectHTML += `
      <option value="${account.accountNumber}">${account.accountNumber}</option>
      `;
        tableHTML += `
      <div class="row">
      <p class="column">${account.accountNumber}</p>
      <p class="column">${account.type}</p>
      <p class="column" id="${color}">${account.status}</p>
      <p class="column">NG ${account.balance}</p>
      <button class="column" id="delAcct" onClick="deleteAccount('${account.accountNumber}')">Delete Account</button>
      </div>
             `;
      });
      clickAcctNo.innerHTML = selectHTML;
      clickTable[0].innerHTML = tableHTML;
    });
}
fetchData();

// function to make transaction on an account
function transact() {
  const tAction = document.getElementById('action');
  const amt = document.getElementsByClassName('amt');
  const amount = parseFloat(amt[0].value);
  const action = tAction.value;
  const acctNo = clickAcctNo.value;

  fetch(`https://pelumi-banka.herokuapp.com/api/v1/transactions/${acctNo}/${action}`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: bearer,
    },
    method: 'POST',
    body: JSON.stringify({
      amount,
    }),
  })
    .then(res => res.json())
    .then((response) => {
      if (response.error || response.message) {
        const x = document.getElementById('snackbar');
        x.innerText = response.error || response.message;
        x.className = 'show';
        setTimeout(() => { x.className = x.className.replace('show', ''); }, 3000);
      }
      if (response.status === 201) {
        const x = document.getElementById('snackbar');
        x.innerText = 'Trasanction succesfully made';
        x.className = 'show';
        setTimeout(() => { x.className = x.className.replace('show', ''); }, 3000);
        fetchData();
      }
    });
}

// Function to delete an account
function deleteAccount(acctNo) {
  fetch(`https://pelumi-banka.herokuapp.com/api/v1/accounts/${acctNo}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    method: 'DELETE',
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status) {
        const x = document.getElementById('snackbar');
        x.innerText = 'Account succesfully deleted!';
        x.className = 'show';
        setTimeout(() => { x.className = x.className.replace('show', ''); }, 3000);
        fetchData();
      }
    });
}
