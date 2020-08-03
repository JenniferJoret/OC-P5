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


const cartContent = document.getElementById('cart-content');
if (localStorage.cartItems) {
    const cartItems = JSON.parse(localStorage.cartItems);
    let total = 0;
    cartItems.forEach(cartItem => {
        total = total + parseInt(cartItem.price);
        //création des éléments du panier en side
        let productUl = document.createElement("ul");
        productUl.classList.add('list-unstyled', 'mx-1', 'px-4');
        let productLi = document.createElement('li');
        productLi.classList.add('d-flex', 'justify-content-between');
        let productLiLink = document.createElement('a');
        productLiLink.href = "product.html?id=" + cartItem.id;
        productLiLink.innerText = cartItem.quantity + " " + cartItem.name + " - " + cartItem.color;
        let productPrice = document.createElement("span");
        productPrice.innerText = cartItem.price + " €";


        cartContent.appendChild(productUl);
        productUl.appendChild(productLi);
        productLi.appendChild(productLiLink);
        productLi.appendChild(productPrice);
    })
    let totalPrice = document.createElement('p');
    totalPrice.classList.add('text-center', 'h4', 'py-4');
    totalPrice.innerText = "Total : " + total + " €";
    let cartButton = document.createElement('a');
    cartButton.classList.add('btn', 'btn-outline-light', 'd-flex', 'px-2', 'mx-auto', 'w-content');
    cartButton.href = "cart.html";
    cartButton.innerText = "Voir le détail du panier";
    cartContent.appendChild(totalPrice);
    cartContent.appendChild(cartButton);

} else {
    cartIsEmpty(cartContent);
}

$(document).ready(function () {
    //afficher et masquer la sidebar
    $(function () {
        $("#sidebarCollapse").on("click", function (e) {
            $('#sidebar, #content, #footer, #cart-teddy').toggleClass('active');
            $('.collapse.in').toggleClass('in');
            $("#nav").find('.collapse.show').collapse('hide');
            e.stopPropagation();
        });
        $(document).on("click", function (e) {
            if ($(e.target).is("#sidebar *") === false) {
                $('#sidebar, #content ,#footer, #cart-teddy').removeClass('active');
            }
        });
    });

    //margin du content en fonction de la taille de la navbar
    var heightContent = $('#nav').height();
    $('#sidebar, #main').css({
        marginTop: heightContent
    });
    //le main remplira toujours l'espace disponible
    function autoResizeDiv() {
        var heightFooter = $('#footer').height();
        document.getElementById('main').style.minHeight = (window.innerHeight - heightFooter - heightContent) + 'px';
    }
    window.onresize = autoResizeDiv;
    autoResizeDiv();

});