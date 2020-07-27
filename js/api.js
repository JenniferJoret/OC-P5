var APITeddies = "http://localhost:3000/api/teddies";
async function products(url) {
    let result = await fetch(url);
    return result.json();
}