var APITeddies = "/api/teddies";

//Appel asynchrone de l'API
async function products(url) {
    let result = await fetch(url);
    //Récupération des données en json
    return result.json();
}