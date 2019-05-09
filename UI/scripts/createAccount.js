/* eslint-disable no-undef */
const create = document.querySelector('#createAcct');
const errorDiv = document.getElementById('errDiv');
// eslint-disable-next-line no-var
const isModal = document.getElementById('boolean').innerText;
const profile = document.getElementById('isProfile').innerText;

// ---------------- Load all user account to dashboard
const loadAccounts = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const { email } = userDetails[0];
  const url = `https://pelumi-banka.herokuapp.com/api/v1/user/${email}/accounts`;

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJheW9AZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiYXlvIiwibGFzdE5hbWUiOiJhbGVzaCIsInBhc3N3b3JkIjoiJDJiJDEwJEx5SUp6R3FKbjd5NDNvZzU3NG5LNS5pcmR6T3kzSjJXWWVTUVBKN0NxdmhOWi5ObkI3QVAuIiwidHlwZSI6InN0YWZmIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU1NzQxMTI0MiwiZXhwIjoxODgxNDExMjQyfQ.4OsSAw3VI0-fN1Nf9KRLaVowXRqtaQ9lSZLITMDt0Do';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
  });
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
        const table = document.getElementById('proRwdTable');
        const { accounts } = response;
        let html = `
          <tr>
            <th>Account Type</th>
            <th>Balance</th>
            <th>Account No</th>
            <th>Status</th>
          </tr> 
          `;
        accounts.forEach((account) => {
          const color = account.status === 'active' ? 'green' : 'red';
          html += `
      <tr>
          <td data-th="Acct Type" style="text-transform:capitalize;">${account.type}</td>
          <td data-th="Balance">${formatter.format(account.balance)}</td>
          <td data-th="Account Number">${account.accountNumber}</td>
          <td data-th="Status" class="${color}" style="text-transform:capitalize;">${account.status} <i class="fas fa-circle"></i></td>
      </tr>
          `;
        });
        table.innerHTML = html;
      }
    });
};
if (profile === 'true') {
  loadAccounts();
}

// ------------------------- Create account
create.addEventListener('click', (e) => {
  e.preventDefault();

  const type = document.getElementById('acct-type').value;
  const initialDeposit = document.getElementById('initialDeposit').value;

  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const bearer = `Bearer ${userDetails[0].token}`;
  fetch('https://pelumi-banka.herokuapp.com/api/v1/accounts', {
    headers: {
      Authorization: bearer,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      type,
      initialDeposit,
    }),
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 400) {
        errorDiv.style.border = '1px solid rgb(126, 1, 1)';
        errorDiv.style.padding = '1rem';
        let errors = '';
        response.error.forEach((error) => {
          errors += `- ${error} </br>`;
        });
        errorDiv.innerHTML = errors;
      }
      if (response.status === 201 && isModal === 'true') {
        errorDiv.style.border = '0px solid transparent';
        errorDiv.style.padding = '0rem';
        errorDiv.innerHTML = '';
        const x = document.getElementById('snackbar');
        x.className = 'show';
        loadAccounts();
        x.innerText = 'Account created succcesfully...';
        setTimeout(() => { x.className = x.className.replace('show', ''); }, 3000);
      }
      if (response.status === 201 && isModal === 'false') {
        errorDiv.style.border = '0px solid transparent';
        errorDiv.style.padding = '0rem';
        errorDiv.innerHTML = '';

        localStorage.setItem('firstAccount', JSON.stringify(response.data[0]));
        setTimeout(() => {
          window.location = './dashboard.html';
        }, 2000);
      }
    });
});
