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
