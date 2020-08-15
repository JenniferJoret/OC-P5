const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
//on récupère les données en URL
orderNameInner = urlParams.get('user');
orderIDInner = urlParams.get('id');

//GESTION DE LA CONFIRMATION
if (orderIDInner == null || orderNameInner == null) {
//S'il n'y a eu aucune commande, retour index
    window.location.href = "index.html";
} else if (orderIDInner === "undefined"){
    //S'il y a eu un problème avec le serveur, message d'erreur
    let confirmationBloc = document.getElementById('confirmation');
    confirmationBloc.innerHTML='<h1>Oops !</h1><br><p class="h3 p-1">Il semble qu\'il y ait eu un problème avec votre commande... </p><p class="h3 p-1 mb-4">Veuillez réessayer plus tard.</p><a href="index.html" class="btn btn-primary">Revenir à l\'accueil</a>';
} else {
    //Sinon on affiche le message de confirmation et on efface l'entrée en localStorage
    const orderName = document.getElementById('name');
    orderName.innerText = orderNameInner;
    const orderID = document.getElementById('orderNumber');
    orderID.innerText = orderIDInner;
    localStorage.removeItem("cartItems");
}