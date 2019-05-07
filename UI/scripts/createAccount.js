/* eslint-disable no-undef */
const create = document.querySelector('#createAcct');
const errorDiv = document.getElementById('errDiv');
// eslint-disable-next-line no-var
const isModal = document.getElementById('boolean').innerText;

create.addEventListener('click', (e) => {
  e.preventDefault();

  const type = document.getElementById('acct-type').value;
  const initialDeposit = document.getElementById('initialDeposit').value;

  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const bearer = `Bearer ${userDetails[0].token}`;
  fetch('http://localhost:3000/api/v1/accounts', {
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

        setTimeout(() => { x.className = x.className.replace('show', ''); }, 3000);
      }
      if (response.status === 201 && isModal === 'false') {
        errorDiv.style.border = '0px solid transparent';
        errorDiv.style.padding = '0rem';
        errorDiv.innerHTML = '';

        setTimeout(() => {
          window.location = './dashboard.html';
        }, 2000);
      }
    });
});
