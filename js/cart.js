const cartContentDetail = document.getElementById('cart-body');

let shippingContent = {
    contact: {},
    products: []
}

function validateEmail(mail) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
}


// Envoie données à l'api
const sendCart = async () => {
    const response = await fetch("http://localhost:3000/api/teddies/order", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(shippingContent),
    }).catch(function (error) {
        console.log("error.response.data"); // this is the part you need that catches 400 request
    });
    return await response.json();
};


let i = 0;
//afficher les éléments du localStorage dans le panier
if (localStorage.cartItems) {
    const cartItems = JSON.parse(localStorage.cartItems);
    let total = 0;
    cartItems.forEach(cartItem => {
        total = total + parseInt(cartItem.price);
        //création des éléments du panier
        let productDetail = document.createElement('tr');
        productDetail.innerHTML = '<td><div class="d-flex w-100 align-items-center"><img src="' + cartItem.url + '" class="img-sm mr-3"> <span class="info"> <a href="product.html?id=' + cartItem.id + '" class="title text-dark" data-abc="true">' + cartItem.name + '</a> <p class="text-muted small">' + cartItem.color + ' </span> </div></td><td> <p class="pl-4 text-bold h5 ">' + cartItem.quantity + '</p></td>    <td><div class="price-wrap"><p class="price mb-0">' + cartItem.price + ' €</p> <small class="text-muted"> ' + cartItem.price / cartItem.quantity + ' € l\'unité </small> </div></td><td class="text-right"> </a> <button id="delete-' + i + '" value="' + i + '" class="btn btn-warning test"><i class="fa fa-trash" aria-hidden="true"></i></button></td>';
        cartContentDetail.appendChild(productDetail);
        shippingContent.products.push(cartItem.id);
        //Suppression de l'élément relatif au bouton "supprimé" cliqué
        let deleteBtn = document.getElementById('delete-' + i);
        deleteBtn.onclick = function () {
            cartItems.splice(deleteBtn.value, 1);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            document.location.reload(true);
            //si le panier est vide, on supprime l'entrée du localStorage
            if (cartItems.length === 0) {
                localStorage.removeItem("cartItems");
            }
        };
        i++;
    })
    //total général (bas détail panier)
    let totalPrice = document.createElement('tr');
    totalPrice.innerHTML = '<tr><td></td><td class="text-right"><strong>Total</strong></><td class="text-left"><strong>' + total + ' €</strong></td></tr>';
    cartContentDetail.appendChild(totalPrice);

    //Totaux de la carte
    let totalCart = document.getElementById("total1");
    totalCart.innerText = total + " €";
    let finalTotal = document.getElementById('finalTotal');
    finalTotal.innerText = total + " €";

} else {
    //Si le panier est vide, on n'affiche pas le bloc panier
    document.getElementById('cart-bloc').style.display = "none";
    //Et on affiche un message disant que le panier est vide
    let emptyCart = document.createElement('h4');
    emptyCart.classList.add('text-center', 'h1', 'mx-auto', 'bg-white', 'p-5', 'rounded');
    emptyCart.innerText = "Votre panier est vide !"
    document.getElementById('main').appendChild(emptyCart);
}
// lors du clic sur "passer commande", le formulaire apparaît
let cartBuyBtn = document.getElementById("cart-buy");
cartBuyBtn.addEventListener('click', function () {
    document.getElementById('cart-bloc').style.display = "none";
    let shippingForm = document.getElementById('shipping-form');
    shippingForm.classList.remove('d-none');
    shippingForm.style.display = "bloc";
})


let mailValue = document.getElementById('email');
let confirmShipping = document.getElementById("confirm");
let alertWarning = document.getElementById('alert-warning');
let form = document.querySelector('form');

form.addEventListener("input", function () {
    //On vérifie l'adresse vie regex, si elle n'est pas bonne, on affiche un message d'erreur, et on empêche la soumission du formulaire
    if (validateEmail(mailValue.value) === false) {
        alertWarning.classList.remove('d-none');
        alertWarning.innerHTML = '<p>Veuillez renseigner une adresse valide</p>';
        //Si elle est au bon format, on retire le message d'erreur, et on rend le bouton accessible
    } else {
        alertWarning.classList.add('d-none');
    }
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let form = $('form').serializeArray();
    //On récupère les informations du formulaire
    shippingContent.contact = {
        firstName: form[0].value,
        lastName: form[1].value,
        address: form[2].value,
        city: form[3].value,
        email: form[4].value
    }
    //envoi de la commande au serveur
    const response = await sendCart();
    //et on redirige vers la page de confirmation en affichant le prénom et le n°de commande
    window.location = `./confirmation.html?id=${response.orderId}&user=${firstName.value}`;
})