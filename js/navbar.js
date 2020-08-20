const cartContent = document.getElementById('cart-content');

//Fonction qui sert à renseigner le nombre d'articles dans le panier de la navbar
function getNavCount() {
    cartAmount = document.getElementById('cart-amount');
    let cartItems = JSON.parse(localStorage.cartItems);
    let qteAmount = 0;
    cartItems.forEach(cartItem => {
        qteAmount = qteAmount + parseInt(cartItem.quantity);
    })
    cartAmount.innerText = qteAmount;
}

//Fonction qui sert à renseigner le contenu du panier dans la sidebar
function getCartDetail() {
    const cartItems = JSON.parse(localStorage.cartItems);
    let total = 0;
    cartContent.innerHTML = "";
    let productUl = document.createElement("ul");
    cartItems.forEach(cartItem => {
        total = total + parseInt(cartItem.price);
        //création des éléments du panier en side
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
}


//Mise en place des oursons dans le dropdown de la navbar
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


//GESTION DU PANIER SIDEBAR
//Si local storage, on liste les articles dans la sidebar
if (localStorage.cartItems) {
    getNavCount();
    getCartDetail();
} else {
    //Sinon, on indique que le panier est vide
    let emptyCart = document.createElement('h4');
    emptyCart.classList.add('text-center');
    emptyCart.innerText = "Votre panier est vide !"
    cartContent.appendChild(emptyCart);
}


//GESTION DU COMPORTEMENT DE LA PAGE (NAVBAR, SIDEBAR, ET CONTENU DE LA PAGE)
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
    const heightContent = $('#nav').height();
    $('#sidebar, #main').css({
        marginTop: heightContent
    });

    //le main remplira toujours l'espace disponible
    function autoResizeDiv() {
        const heightFooter = $('#footer').height();
        document.getElementById('main').style.minHeight = (window.innerHeight - heightFooter - heightContent) + 'px';
    }
    window.onresize = autoResizeDiv;
    autoResizeDiv();
});