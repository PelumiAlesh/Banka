/* eslint-disable eqeqeq */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */

/*

/*
====================
Profile Page Script
====================
*/
const triggerUpload = document.querySelector('#triggerUpload');
const upInput = document.querySelector('#filePicker');
const preview = document.querySelector('.preview');

// ---------force triggering the file upload here...
try {
  triggerUpload.onclick = () => {
    upInput.click();
  };

  upInput.onchange = (e) => {
    function showPreview() {
      preview.innerHTML = "<div class='loadingLogo'></div>";
      preview.innerHTML += '<img id="img-preview" />';
      const reader = new FileReader();
      reader.onload = () => {
        const img = document.getElementById('img-preview');
        img.src = reader.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      preview.removeChild(document.querySelector('.loadingLogo'));
    }
    showPreview();
  };
} catch (err) {
  console.log('');
}

// -------------Function to enable and saveprofile edit
// eslint-disable-next-line no-unused-vars
function editUser() {
  document.getElementById('email').disabled = false;
  document.getElementById('phone').disabled = false;
  document.getElementById('mothers_name').disabled = false;
  document.getElementById('state').disabled = false;
  document.getElementById('address').disabled = false;
}
// eslint-disable-next-line no-unused-vars
function saveUser() {
  document.getElementById('email').disabled = true;
  document.getElementById('phone').disabled = true;
  document.getElementById('mothers_name').disabled = true;
  document.getElementById('state').disabled = true;
  document.getElementById('address').disabled = true;
}


/*
====================
Admin Page Script
====================
*/

// ------------Activating and deactivating account
function change(color, buttonStatus) {
  if (buttonStatus.innerText === 'Activate') {
    buttonStatus.innerText = 'Deativate';
    buttonStatus.classList.add('red_btn');
    buttonStatus.classList.remove('green_btn');
    color.className = 'red';
  } else {
    buttonStatus.innerText = 'Activate';
    buttonStatus.classList.add('green_btn');
    buttonStatus.classList.remove('red_btn');
    color.className = 'green';
  }
}
// eslint-disable-next-line no-unused-vars
function activateDeactivate(id) {
  const color = document.getElementById(id);
  const buttonStatus = document.querySelector(`.${id}`);
  change(color, buttonStatus);
}

/*
====================
Create Account Modal
====================
*/


const modal = document.getElementById('create_account_modal');
const modall = document.getElementById('create_account_modal_');

function toggleCreateAccoutn(id) {
  const modalr = document.getElementById(id);
  toggle.checked = false;
  modalr.style.display = 'block';
}

function closemodal(id) {
  const modale = document.getElementById(id);
  modale.style.display = 'none';
}


/*
====================
Close by clicking anywhere
====================
*/

window.onclick = function (event) {
  if (event.target == modall) {
    modall.style.display = 'none';
  }
  if (event.target == modal) {
    modal.style.display = 'none';
  }
  const toggle = document.getElementById('toggle');
  event.stopPropagation();
  if (event.target.closest('#toggle')) return;
  // eslint-disable-next-line no-constant-condition
  if (true) {
    toggle.checked = false;
  }
};
