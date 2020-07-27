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