//Récupération de l'ID envoyé dans l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('id')


//Modification de l'URL de l'API (ajout de l'ID)
var APITeddies = "http://localhost:3000/api/teddies/" + product;


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

        if (qte.value > 0) {
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
                if (isInArray == false){
                    cartItems.push(product);
                }
                //et on envoie en storage;
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
            } else {
                //Sinon, on crée le tableau du storage
                localStorage.setItem("cartItems", JSON.stringify([product]));
            }
            const alertSuccess = document.getElementById('alert-success');
            alertSuccess.textContent = product.name + " a bien été ajouté au panier !";
            alertSuccess.classList.remove('d-none');
            alertSuccess.classList.add('d-block');
            setTimeout(function(){ 
                alertSuccess.classList.remove('d-block');
                alertSuccess.classList.add('d-none'); 
            }, 3000);
        };
        if (localStorage.cartItems) {
            cartAmount = document.getElementById('cart-amount');
            let cartItems = JSON.parse(localStorage.cartItems);
            let qteAmount = 0;
            cartItems.forEach(cartItem => {
                qteAmount = qteAmount + parseInt(cartItem.quantity);
            })
            cartAmount.innerText = qteAmount;
        }
    });
})