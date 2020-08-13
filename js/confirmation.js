const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

orderNameInner = urlParams.get('user');
orderIDInner = urlParams.get('id');

if (orderIDInner == null || orderNameInner == null) {
    window.location.href = "index.html";
} else {
    const orderName = document.getElementById('name');
    orderName.innerText = orderNameInner;
    const orderID = document.getElementById('orderNumber');
    orderID.innerText = orderIDInner;
}