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
            quantity: qte.value,
            price: productPrice.innerText,
            color: itemColor
        };
        if (qte.value > 0) {
            //Si il y a déjà des objets dans le panier on récupère les données, on les met à jour et on les réimplante 
            if (localStorage.cartItems) {
                let cartItems = JSON.parse(localStorage.cartItems);
                cartItems.push(product);
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
            } else {
                //Sinon, on crée le tableau du storage
                localStorage.setItem("cartItems", JSON.stringify([product]));
            };
            //message d'information lorsque l'article a été ajouté
            addToCart.innerText = teddy.name + " a été ajouté au panier !";
            addToCart.classList.add('disabled', 'bg-success');
            //On attend deux secondes, puis on redonne accès au bouton
            setTimeout(function () {
                addToCart.innerText = "Ajouter au panier"
                addToCart.classList.remove('disabled', 'bg-success');
            }, 2000);
        } else {
            //message d'information si erreur
            addToCart.innerText = "Votre demande n'a pas pu être traitée";
            addToCart.classList.add('disabled', 'bg-danger');
        };
    });
    
})


//Total des commandes
// if (localStorage.cartItems) {
//     cartAmount = document.getElementById('cartAmount');
//     let cartItems = JSON.parse(localStorage.cartItems);
//     console.log(cartItems);
//     let test = 0;
//     cartItems.forEach(cartItem => {
//         test = test + parseInt(cartItem.price);
//     })
//     console.log(test);
// }