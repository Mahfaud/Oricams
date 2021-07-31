let productinStorage = JSON.parse(localStorage.getItem("product"))

let main = document.querySelector("main")
let cart = 0

for (let i = 0; i < productinStorage.length; i++) {
    productTitle = main.appendChild(document.createElement("h1"))
    productTitle.innerHTML = productinStorage[i].nomProduit
    productPrice = main.appendChild(document.createElement("p"))
    productPrice.innerHTML = productinStorage[i].prixProduit + "€"
    cart += Number(productinStorage[i].prixProduit)
    productLens = main.appendChild(document.createElement("p"))
    productLens.innerHTML = productinStorage[i].lentilleProduit
}


cartTotal = main.appendChild(document.createElement("h2"))
cartTotal.innerHTML = "Panier total : " + cart + "€"