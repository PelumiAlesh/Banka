/* eslint-disable no-undef */

const submit = document.querySelector('#submit');
const errorDiv = document.getElementById('errDiv');
const signtext = document.getElementById('sign_text');
const loader = document.getElementsByClassName('lds-ellipsis');

submit.addEventListener('click', (e) => {
  e.preventDefault();
  loader[0].style.display = 'inline-block';
  signtext.style.display = 'none';

  const email = document.getElementById('email').value;
  const lastName = document.getElementById('lastName').value;
  const password = document.getElementById('password').value;
  const firstName = document.getElementById('firstName').value;

  fetch('https://pelumi-banka.herokuapp.com/api/v1/auth/signup', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 409) {
        // Loader indicator
        loader[0].style.display = 'none';
        signtext.style.display = 'inline-block';

        errorDiv.style.border = '1px solid rgb(126, 1, 1)';
        errorDiv.style.padding = '1rem';
        errorDiv.innerHTML = response.error;
      }
      if (response.status === 400) {
        // Loader indicator
        loader[0].style.display = 'none';
        signtext.style.display = 'inline-block';

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

        localStorage.setItem('userDetails', JSON.stringify(response.data));
        setTimeout(() => {
        // Loader indicator
          loader[0].style.display = 'none';
          signtext.style.display = 'inline-block';

          window.location = './USER/create_account.html';
        }, 2000);
      }
    });
});
