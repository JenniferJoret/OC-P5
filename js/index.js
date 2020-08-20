//GESTION DE L'AFFICHAGES DES DIFFERENTS PRODUITS PRESENTS DANS L'API

products(APITeddies).then(teddies => {
    teddies.forEach(teddy => {

        const teddiesCards = document.getElementById('teddiesCards');
        const teddiesNav = document.getElementById('nav-teddies');

        //création d'une carte pour chaque produit
        const teddyCard = document.createElement('div');
        teddyCard.classList.add('card', 'text-center', 'col-10', 'col-md-5', 'col-xl-3');
        const teddyPicture = document.createElement('img');
        teddyPicture.classList.add('card-img-top');
        teddyPicture.src = teddy.imageUrl;
        teddyPicture.alt = "Photo de " + teddy.name;
        const teddyInnerCard = document.createElement('div');
        teddyInnerCard.classList.add('card-body', 'd-flex', 'flex-column', 'justify-content-between');
        const teddyInnerTitle = document.createElement('h3');
        teddyInnerTitle.classList.add('card-title', 'h3');
        teddyInnerTitle.innerText = teddy.name;
        const teddyInnerDescription = document.createElement('p');
        teddyInnerDescription.classList.add('card-text');
        teddyInnerDescription.innerText = teddy.description;
        const teddyLink = document.createElement('a');
        teddyLink.href = "product.html?id=" + teddy._id;
        teddyLink.classList.add('btn');
        teddyLink.classList.add('btn-primary');
        teddyLink.innerHTML = ' En savoir plus sur <br/> <span class="fas fa-paw"></span>  ' + teddy.name + '  <span class="fas fa-paw"></span> ';

        //mise en place de la carte
        teddiesCards.appendChild(teddyCard);
        teddyCard.appendChild(teddyPicture);
        teddyCard.appendChild(teddyInnerCard);
        teddyInnerCard.appendChild(teddyInnerTitle);
        teddyInnerCard.appendChild(teddyInnerDescription);
        teddyInnerCard.appendChild(teddyLink);
    })
});








