let productinStorage = JSON.parse(localStorage.getItem("product"))

let cartDiv = document.querySelector(".cart")
let cart = 0


for (let i = 0; i < productinStorage.length; i++) {
    productTitle = cartDiv.appendChild(document.createElement("h1"))
    productTitle.innerHTML = productinStorage[i].nomProduit
    productPrice = cartDiv.appendChild(document.createElement("p"))
    productPrice.innerHTML = productinStorage[i].prixProduit + "€"
    cart += Number(productinStorage[i].prixProduit)
    productLens = cartDiv.appendChild(document.createElement("p"))
    productLens.innerHTML = productinStorage[i].lentilleProduit
}


cartTotal = cartDiv.appendChild(document.createElement("h2"))
cartTotal.innerHTML = "Panier total : " + cart + "€"