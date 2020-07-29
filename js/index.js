products(APITeddies).then(teddies => {
    teddies.forEach(teddy => {

        const teddiesCards = document.getElementById('teddiesCards');
        const teddiesNav = document.getElementById('nav-teddies');

        //création d'une carte pour chaque produit
        let teddyCard = document.createElement('div');
        teddyCard.classList.add('card');
        teddyCard.classList.add('col-3');
        let teddyPicture = document.createElement('img');
        teddyPicture.classList.add('card-img-top');
        teddyPicture.src = teddy.imageUrl;
        teddyPicture.alt = "Photo de " + teddy.name;
        let teddyInnerCard = document.createElement('div');
        teddyInnerCard.classList.add('card-body');
        let teddyInnerTitle = document.createElement('h4');
        teddyInnerTitle.classList.add('card-title');
        teddyInnerTitle.innerText = teddy.name;
        let teddyInnerDescription = document.createElement('p');
        teddyInnerDescription.classList.add('card-text');
        teddyInnerDescription.innerText = teddy.description;
        let teddyLink = document.createElement('a');
        teddyLink.href = "product.html?id=" + teddy._id;
        teddyLink.classList.add('btn');
        teddyLink.classList.add('btn-primary');
        teddyLink.innerHTML = '<i class="fas fa-paw"></i>  En savoir plus sur ' + teddy.name + '  <i class="fas fa-paw"></i>';

        //mise en place de la carte
        teddiesCards.appendChild(teddyCard);
        teddyCard.appendChild(teddyPicture);
        teddyCard.appendChild(teddyInnerCard);
        teddyInnerCard.appendChild(teddyInnerTitle);
        teddyInnerCard.appendChild(teddyInnerDescription);
        teddyInnerCard.appendChild(teddyLink);
    })
});








