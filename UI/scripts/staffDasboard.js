/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
/* eslint-disable no-undef */
const name = document.getElementById('userName');
const totValue = document.getElementById('totAcct');
const totActAcct = document.getElementById('totActAcct');
const totDomAcct = document.getElementById('totDomAcct');
const totBal = document.getElementById('totBal');

const acctTable = document.getElementsByClassName('rwd-table');

const userDetails = JSON.parse(localStorage.getItem('userDetails'));

name.innerText = `${userDetails[0].firstName} ${userDetails[0].lastName}`;
const bearer = `Bearer ${userDetails[0].token}`;

// function to abbreviateNumber
function abbreviateNumber(number) {
  const SI_POSTFIXES = ['', 'k', 'M', 'G', 'T', 'P', 'E'];
  const tier = Math.log10(Math.abs(number)) / 3 | 0;
  if (tier === 0) return number;
  const postfix = SI_POSTFIXES[tier];
  // eslint-disable-next-line no-restricted-properties
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;
  let formatted = `${scaled.toFixed(1)}`;
  if (/\.0$/.test(formatted)) { formatted = formatted.substr(0, formatted.length - 2); }
  return formatted + postfix;
}


// Calculate total balance function
function calcBalance(bals) {
  let totalBal = 0;
  bals.forEach((bal) => {
    totalBal += parseFloat(bal);
  });
  return totalBal;
}

// Load all the UI Data
function loadData() {
  let html = `
  <tr>
  <th></th>
  <th>Email</th>
  <th>Balance</th>
  <th>Account Type</th>
  <th>Account Number</th>
  <th></th>
  </tr>
  `;
  let no = 0;
  const balArray = [];
  let active = 0;
  let dormant = 0;


  fetch('https://pelumi-banka.herokuapp.com/api/v1/accounts', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    method: 'GET',
  })
    .then(res => res.json())
    .then((response) => {
      const accounts = response.data;
      accounts.forEach((account) => {
        no += 1;
        balArray.push(account.balance);
        const color = account.status === 'active' ? 'green' : 'red';
        const btnText = account.status === 'active' ? 'Active' : 'Dormant';
        const btnVal = account.status === 'active' ? 'Deactivate' : 'Activate';
        const formatter = new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
        });
        switch (account.status) {
          case 'active':
            active += 1;
            break;

          default:
            dormant += 1;
            break;
        }

        html += `
        <tr>
        <td data-th="Status" id="button${no}" class="${color}"><i class="fas fa-circle"></i></td>
        <td data-th="Email"> <span onClick="saveEmail('${account.ownerEmail}', '${account.accountNumber}')" style="color:green;cursor:pointer;">${account.ownerEmail}<span/></td>
        <td data-th="Balance">${formatter.format(account.balance)}</td>
        <td data-th="Account Type">${account.type}</td>
        <td data-th="Account N0">${account.accountNumber}</td>
        <td> <button value="${btnVal}" onclick="activateDeactivate('button${no}', ${account.accountNumber})"
                class="button${no} ${color}_btn">${btnText}</button></td>
    </tr>
        `;
      });

      totActAcct.innerText = active;
      totDomAcct.innerText = dormant;
      totValue.innerText = no;
      totBal.innerText = `₦${abbreviateNumber(calcBalance(balArray))}`;
      acctTable[0].innerHTML = html;
    });
}

// ------------Activating and deactivating account
function change(color, buttonStatus, acctNo) {
  const status = buttonStatus.innerText === 'Active' ? 'dormant' : 'active';
  fetch(`https://pelumi-banka.herokuapp.com/api/v1/accounts/${acctNo}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
    method: 'PATCH',
    body: JSON.stringify({
      status,
    }),
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 200) {
        if (status === 'dormant') {
          buttonStatus.innerText = 'Dormant';
          buttonStatus.classList.add('red_btn');
          buttonStatus.classList.remove('green_btn');
          color.className = 'red';
        } else {
          buttonStatus.innerText = 'Active';
          buttonStatus.classList.add('green_btn');
          buttonStatus.classList.remove('red_btn');
          color.className = 'green';
        }
      }
    });
}
// eslint-disable-next-line no-unused-vars
function activateDeactivate(id, acctNo) {
  const color = document.getElementById(id);
  const buttonStatus = document.querySelector(`.${id}`);
  change(color, buttonStatus, acctNo);
}

loadData();
