const cartContentDetail = document.getElementById('cart-body');
let shippingContent = {
    contact: {},
    products: []
}
//afficher les éléments du localStorage dans le panier
if (localStorage.cartItems) {
    const cartItems = JSON.parse(localStorage.cartItems);
    let total = 0;
    cartItems.forEach(cartItem => {
        total = total + parseInt(cartItem.price);
        //création des éléments du panier
        let productDetail = document.createElement('tr');
        productDetail.innerHTML = '<td><div class="d-flex w-100 align-items-center"><img src="' + cartItem.url + '" class="img-sm mr-3"> <span class="info"> <a href="product.html?id=' + cartItem.id + '" class="title text-dark" data-abc="true">' + cartItem.name + '</a> <p class="text-muted small">' + cartItem.color + ' </span> </div></td><td> <input class="pl-2" min="1" max="20" type="number" value="' + cartItem.quantity + '"></td>    <td><div class="price-wrap"><p class="price mb-0">' + cartItem.price + ' €</p> <small class="text-muted"> ' + cartItem.price / cartItem.quantity + ' € l\'unité </small> </div></td><td class="text-right"> </a> <a id="delete-btn" href="" class="btn btn-warning"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
        cartContentDetail.appendChild(productDetail);
        shippingContent.products.push(cartItem.id);
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

// Envoie données à l'api
const sendCart = async () => {
    const response = await fetch("http://localhost:3000/api/teddies/order", {
        headers: {
            "Content-Type": "application/json",
        },
        method : "POST",
        body: JSON.stringify(shippingContent),
    });
    return await response.json();
};
let confirmShipping = document.getElementById("confirm");
confirmShipping.addEventListener("click", async (e) => {
    e.preventDefault();
    let form = $('form').serializeArray();
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
    localStorage.removeItem("cartItems");
    
});


// let deleteBtn = document.getElementById('delete-btn');
// let i=0;
//     //On supprime l'élément
//     deleteBtn.addEventListener('click', function (){
//         let productColor = document.getElementById('')
//         while (i < cartItems.length) {
//             if (cartItems[i].id == product.id && cartItems[i].color == product.color) {
//                 cartItems.splice([i], 1);
//                 break;
//             }
//             i++;
//         }
//         //et on renvoie en storage;
//         localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     }) let i = 0;