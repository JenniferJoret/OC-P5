const cartContentDetail = document.getElementById('cart-body');
if (localStorage.cartItems) {
    const cartItems = JSON.parse(localStorage.cartItems);
    let total = 0;
    cartItems.forEach(cartItem => {
        total = total + parseInt(cartItem.price);
        //création des éléments du panier
        let productDetail = document.createElement('tr');
        productDetail.innerHTML = '<td><div class="d-flex w-100 align-items-center"><img src="'+cartItem.url+'" class="img-sm mr-3"> <span class="info"> <a href="product.html?id='+cartItem.id+'" class="title text-dark" data-abc="true">' + cartItem.name + '</a> <p class="text-muted small">' + cartItem.color + ' </span> </div></td><td> <input class="pl-2" min="1" max="20" type="number" value="' + cartItem.quantity + '"></td>    <td><div class="price-wrap"><p class="price mb-0">' + cartItem.price + ' €</p> <small class="text-muted"> ' + cartItem.price / cartItem.quantity + ' € l\'unité </small> </div></td><td class="text-right"> </a> <a href="" class="btn btn-warning"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
        cartContentDetail.appendChild(productDetail);
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