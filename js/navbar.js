products(APITeddies).then(teddies => {
    teddies.forEach(teddy => {
        const teddiesNav = document.getElementById('nav-teddies');
        //création des éléments de liste pour la barre de navigation
        let teddyLi = document.createElement('li');
        let teddyLiLink = document.createElement('a');
        teddyLiLink.classList.add('dropdown-item');
        teddyLiLink.href = "product.html?id=" + teddy._id;
        teddyLiLink.innerText = teddy.name;
        teddiesNav.appendChild(teddyLi);
        teddyLi.appendChild(teddyLiLink);
    })
});

//Quantité panier
if (localStorage.cartItems) {
    cartAmount = document.getElementById('cart-amount');
    let cartItems = JSON.parse(localStorage.cartItems);
    console.log(cartItems);
    let qteAmount = 0;
    cartItems.forEach(cartItem => {
        qteAmount = qteAmount + parseInt(cartItem.quantity);
    })
    cartAmount.innerText = qteAmount;
}