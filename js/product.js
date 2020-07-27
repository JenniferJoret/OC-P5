const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('id')
console.log(product);

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ".");
}

var APITeddies = "http://localhost:3000/api/teddies/" + product;

products(APITeddies).then(teddy => {
    console.log(teddy);
    teddy.colors.forEach(color => {
        const select = document.getElementById("inputState");
        let option = document.createElement('option');
        option.innerText = color;
        select.appendChild(option);
    });
    const teddyName = document.getElementById("product-title");
    const teddyPicture = document.getElementById('product-picture');
    const teddyDescription = document.getElementById("product-description");
    const teddyPrice = document.getElementById("price");
    const teddyColors = document.getElementById("colors");


    teddyName.innerText = teddy.name;
    teddyPicture.src = teddy.imageUrl;
    teddyDescription.innerText = teddy.description;
    teddyPrice.innerText = numberWithCommas(teddy.price) + " €";
})