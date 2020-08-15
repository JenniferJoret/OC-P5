const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

orderNameInner = urlParams.get('user');
orderIDInner = urlParams.get('id');

if (orderIDInner == null || orderNameInner == null) {
    window.location.href = "index.html";
} else if (orderIDInner === "undefined"){
    let confirmationBloc = document.getElementById('confirmation');
    confirmationBloc.innerHTML='<h1>Oops !</h1><br><p class="h3 p-1">Il semble qu\'il y ait eu un problème avec votre commande... </p><p class="h3 p-1 mb-4">Veuillez réessayer plus tard.</p><a href="index.html" class="btn btn-primary">Revenir à l\'accueil</a>';
} else {
    const orderName = document.getElementById('name');
    orderName.innerText = orderNameInner;
    const orderID = document.getElementById('orderNumber');
    orderID.innerText = orderIDInner;
    localStorage.removeItem("cartItems");
}