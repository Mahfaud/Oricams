let productinStorage = JSON.parse(localStorage.getItem("products"))
let button = document.getElementById("confirmButton")
let form = document.getElementById("formClient")
let cartDiv = document.querySelector(".cart")
let cart = 0
let mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
let smallBaliseLastName = document.createElement("small")
let smallBaliseFirstName = document.createElement("small")
let smallBaliseAddress = document.createElement("small")
let smallBaliseCity = document.createElement("small")
let smallBaliseEmail = document.createElement("small")
let allSmallBalise = document.getElementsByTagName("small")
let productsId = []

if (productinStorage) {

    if (productinStorage)
    for (idInLocalStorage of productinStorage) {
        if (idInLocalStorage.quantity > 1) {
            for (let i = 0; i < idInLocalStorage.quantity; i++) {
                productsId.push(idInLocalStorage._id)
        }
        } else {
            productsId.push(idInLocalStorage._id)
        }
    }

    for (let i = 0; i < productinStorage.length; i++) {
        let productDiv = cartDiv.appendChild(document.createElement("div"))
        productDiv.classList.add("row", "justify-content-around", "cartLine")
        let productTitle = productDiv.appendChild(document.createElement("h3"))
        productTitle.innerHTML = productinStorage[i].name
        let productLens = productDiv.appendChild(document.createElement("p"))
        productLens.innerHTML = productinStorage[i].lens
        let productPrice = productDiv.appendChild(document.createElement("p"))
        productPrice.innerHTML = productinStorage[i].price + "€"
        cart += Number(productinStorage[i].price)
    }
}

let allCartLine = document.querySelectorAll(".cartLine")

let cartTotal = cartDiv.appendChild(document.createElement("h2"))
cartTotal.classList.add("cartTotal")
cartTotal.innerHTML = "Panier total : " + Math.round(cart*100)/100 + "€"

let emptyButton = cartDiv.appendChild(document.createElement("button"))
emptyButton.classList.add("btn" , "btn-danger" , "mx-auto")
emptyButton.innerHTML = "Vider votre panier"

emptyButton.addEventListener("click", () => {
    localStorage.clear()
    for (let i = allCartLine.length ; i-- > 0;) {
        allCartLine[i].parentNode.removeChild(allCartLine[i])
        cartTotal.innerHTML = "Panier total : 0€"
    }
})


button.addEventListener("click", (e) => {
    e.preventDefault()
    for (let i = allSmallBalise.length ; i-- > 0;) {
        allSmallBalise[i].parentNode.removeChild(allSmallBalise[i])
    }
    let confirmForm = true
    if (form.lastName.value.length > 30 || /\d/g.test(form.lastName.value) || form.lastName.value.length < 2) {
        confirmForm = false
        let dangerLastName = document.getElementById("lastNameForm").appendChild(smallBaliseLastName)
        dangerLastName.innerHTML = "Il y a un problème avec le nom de famille indiqué."
        dangerLastName.classList.add("form-text" , "text-danger")
    }
    if (form.firstName.value.length > 30 || /\d/g.test(form.firstName.value) || form.firstName.value.length < 2) {
        confirmForm = false
        let dangerfirstName = document.getElementById("firstNameForm").appendChild(smallBaliseFirstName)
        dangerfirstName.innerHTML = "Il y a un problème avec le prénom indiqué."
        dangerfirstName.classList.add("form-text" , "text-danger")
    }
    if (form.address.value.length > 100 || form.address.value.length < 5) {
        confirmForm = false
        let dangerAddress = document.getElementById("addressForm").appendChild(smallBaliseAddress)
        dangerAddress.innerHTML = "Il y a un problème avec l'adresse indiquée."
        dangerAddress.classList.add("form-text" , "text-danger")
    }
    if (form.city.value.length > 50 || form.city.value.length < 3) {
        confirmForm = false
        let dangerCity = document.getElementById("cityForm").appendChild(smallBaliseCity)
        dangerCity.innerHTML = "Il y a un problème avec la ville indiquée."
        dangerCity.classList.add("form-text" , "text-danger")
    }
    if (!mailRegex.test(form.email.value) || form.email.value.length > 100) {
        confirmForm = false
        let dangerEmail = document.getElementById("emailForm").appendChild(smallBaliseEmail)
        dangerEmail.innerHTML = "Il y a un problème avec l'email indiquée."
        dangerEmail.classList.add("form-text" , "text-danger")
    }
    if (confirmForm) {
        let order = {
            contact: {
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                address: form.address.value,
                city: form.city.value,
                email: form.email.value
            },
            products: productsId
        }

        let headers = {
            method: "POST",
            body: JSON.stringify(order),
            headers: {"Content-Type" : "application/json"}
        }

        fetch("http://localhost:3000/api/cameras/order", headers)
    } else {
        e.preventDefault()
    }
    })

