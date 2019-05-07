/* eslint-disable no-undef */
const create = document.querySelector('#createAcct');
const errorDiv = document.getElementById('errDiv');

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
      if (response.status === 201) {
        errorDiv.style.border = '0px solid transparent';
        errorDiv.style.padding = '0rem';
        errorDiv.innerHTML = '';
        const x = document.getElementById('snackbar');
        x.className = 'show';

        setTimeout(() => { x.className = x.className.replace('show', ''); }, 3000);
      }
    });
});
