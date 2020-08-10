const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const orderName = document.getElementById('name');
orderName.innerText = urlParams.get('user');
const orderID = document.getElementById('orderNumber');
orderID.innerText = urlParams.get('id');