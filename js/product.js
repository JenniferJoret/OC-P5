//Récupération de l'ID envoyé dans l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('id')

//Modification de l'URL de l'API (ajout de l'ID)
var APITeddies = "http://localhost:3000/api/teddies/" + product;


//GESTION DE LA PAGE PRODUIT

// Récupération des informations du produit en fonction de l'ID envoyé dans l'URL
products(APITeddies).then(teddy => {
    const select = document.getElementById("inputState");

    const productName = document.getElementById("product-title");
    const productPicture = document.getElementById('product-picture');
    const productDescription = document.getElementById("product-description");
    const productPrice = document.getElementById("price");
    const qte = document.getElementById("quantity");

    const addToCart = document.getElementById('add-to-cart');

    // Mise en place des informations du produit
    productName.innerText = teddy.name;

    productPicture.innerHTML = '<img class="col-12 p-0" id="product-picture" src="'+ teddy.imageUrl + '" alt="Photo de ' + teddy.name + '"/>';
    productPicture.src = teddy.imageUrl;
    productDescription.innerText = teddy.description;
    productPrice.innerText = teddy.price / 100 + " €";

    //Mise à jour du prix affiché en fonction de la quantité sélectionnée
    qte.addEventListener("change", function () {
        productPrice.innerText = (teddy.price * qte.value) / 100 + " €";
    })

    // Mise en place des différentes options de couleur
    teddy.colors.forEach(color => {
        let option = document.createElement('option');
        option.innerText = color;
        select.appendChild(option);
    });

    //Fonction d'ajout au localStorage lors du clic sur le bouton "ajouter au panier"
    addToCart.addEventListener("click", function () {
        let itemColor = select.value;
        let product = {
            id: teddy._id,
            name: teddy.name,
            quantity: parseInt(qte.value),
            price: (teddy.price * qte.value) / 100,
            color: itemColor,
            url: teddy.imageUrl
        };
        //Si il y a déjà des objets dans le panier on récupère les données, on les met à jour et on les réimplante 
        if (localStorage.cartItems) {
            const cartItems = JSON.parse(localStorage.cartItems);
            //Si un objet avec le même ID, et la même couleur est présent, on ajoute les nouveaux éléments à ceux déjà présents dans le tableau
            let i = 0;
            let isInArray = false;
            while (i < cartItems.length) {
                if (cartItems[i].id == product.id && cartItems[i].color == product.color) {
                    cartItems[i].quantity = cartItems[i].quantity + product.quantity;
                    cartItems[i].price = cartItems[i].price + product.price;
                    isInArray = true;
                    break;
                }
                i++;
            }
            //sinon, on crée un nouvel objet
            if (isInArray == false) {
                cartItems.push(product);
            }
            //et on envoie en storage;
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        } else {
            //Sinon, on crée le tableau du storage
            localStorage.setItem("cartItems", JSON.stringify([product]));
        }
        //on met à jour le compte de la navbar et le panier en side
        getCartDetail();
        getNavCount();
        //Et on affiche un message d'alerte pour l'utilisateur
        const alertSuccess = document.getElementById('alert-success');
        alertSuccess.textContent = product.name + " a bien été ajouté au panier !";
        alertSuccess.classList.remove('d-none');
        alertSuccess.classList.add('d-block');
        //Qu'on enlève 3 secondes plus tard
        setTimeout(function () {
            alertSuccess.classList.remove('d-block');
            alertSuccess.classList.add('d-none');
        }, 3000);
    });
}).catch((error) => {
    //si le produit n'existe pas, on affiche un message d'erreur et on redirige vers la page d'accueil
    let content = document.getElementById('main');
    content.innerHTML = '<div class="text-center m-auto bg-white p-5 rounded"><h2 class="h1">Oups ! Le produit recherché n\'existe pas !</h2><br/><p class="h4">Vous allez être redirigé vers la page d\'accueil dans <span id="countdown">5</span> seconde<span id="plural">s</span>...</p></div>';
    var seconds = document.getElementById("countdown").textContent;

    //animer les secondes et prise en compte du pluriel
    var countdown = setInterval(function () {
        seconds--;
        document.getElementById("countdown").textContent = seconds;
        (seconds == 1) ? document.getElementById("plural").textContent = "": document.getElementById("plural").textContent = "s";
        document.getElementById("countdown").textContent = seconds;
        if (seconds <= 1) clearInterval(countdown);
    }, 1000);
    
    //redirection vers la page d'accueil
    setTimeout(function () {
        window.location.href = "index.html";
    }, 5000);
});