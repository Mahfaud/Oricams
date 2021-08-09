let productInStorage = JSON.parse(localStorage.getItem("contact"))
let confirmationDiv = document.querySelector(".confirmationOrder")


if (productInStorage) {
    let orderIdDiv = confirmationDiv.appendChild(document.createElement("h1"))
    orderIdDiv.innerHTML = "Commande " + productInStorage.orderId + " confirmée"
    let thanksDiv = confirmationDiv.appendChild(document.createElement("p"))
    thanksDiv.innerHTML = "Nous vous remercions pour votre confiance " + productInStorage.contact.firstName + ", vous recevrez très rapidement votre commande"

    localStorage.clear()
}