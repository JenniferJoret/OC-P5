const cartContentDetail = document.getElementById('cart-body');
if (localStorage.cartItems) {
    const cartItems = JSON.parse(localStorage.cartItems);
    let total = 0;
    cartItems.forEach(cartItem => {
        total = total + parseInt(cartItem.price);
        //création des éléments du panier
        let productDetail = document.createElement('tr');
        productDetail.innerHTML = '<td><img src="https://dummyimage.com/50x50/55595c/fff" /> </td><td><a href="product.html?id="' + cartItem.id + '">' + cartItem.name + '</a></td><td>' + cartItem.color + '</td><td>' + (cartItem.price/cartItem.quantity) + ' €</td><td><input class="form-control" type="number" value="' + cartItem.quantity + '" /></td><td class="text-right">' + cartItem.price + ' €</td><td class="text-right"><button class="btn btn-sm btn-danger"><i class="fa fa-trash"></i> </button> </td>'
        ;
        cartContentDetail.appendChild(productDetail);
    })
    let totalPrice = document.createElement('tr');
    totalPrice.innerHTML = '<tr><td></td><td></td><td></td><td></td><td><strong>Total</strong></td><td class="text-right"><strong>' + total + ' €</strong></td></tr>';
    cartContentDetail.appendChild(totalPrice);

} else {
 cartIsEmpty(cartContentDetail);
}



