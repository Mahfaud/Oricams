let productinStorage = JSON.parse(localStorage.getItem("products"))
let button = document.getElementById("confirmButton")
let form = document.getElementById("formClient")
let cartDiv = document.querySelector(".cart")
let cart = 0
let mailRegex = /(?:\s|^)(?![a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\S+\b(?=\s|$)/ig
let smallBaliseLastName = document.createElement("small")
let smallBaliseFirstName = document.createElement("small")
let smallBaliseAddress = document.createElement("small")
let smallBaliseCity = document.createElement("small")
let smallBaliseEmail = document.createElement("small")
let allSmallBalise = document.getElementsByTagName("small")
let productsId = []
let confirmForm = true


// Fonction qui crée une nouvelle ligne dans le panier
function addNewElementInCart(div, textInParagraph, newElement) {
    let newDiv = div.appendChild(document.createElement(newElement))
    newDiv.classList.add("productWidth")
    newDiv.innerHTML = textInParagraph
}   

// Fonction qui fitre l'input de l'utilisateur et renvoie un message d'erreur s'il y en a une
function filterInputUser(minLetter, maxLetter, input, regex, formId, balise, errorTheme) {
    if (input.length > maxLetter || regex.test(input) || input.length < minLetter) {
        confirmForm = false
        let newDiv = document.getElementById(formId).appendChild(balise)
        newDiv.innerHTML = "Il y a un problème avec " + errorTheme + " indiqué."
        newDiv.classList.add("form-text" , "text-danger")
    }
}




// S'il y a des produits dans le localStorage alors on mets les ID dans un tableau productsId
if (productinStorage) {
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
        productDiv.classList.add("row", "cartLine")
        addNewElementInCart(productDiv, productinStorage[i].name, "h3")
        addNewElementInCart(productDiv, productinStorage[i].lens, "p")
        addNewElementInCart(productDiv, productinStorage[i].quantity, "p")
        addNewElementInCart(productDiv, productinStorage[i].price + "€", "p")
        cart += Number(productinStorage[i].price)
    }
}

let allCartLine = document.querySelectorAll(".cartLine")

// Affiche un titre h2 avec le panier total
let cartTotal = cartDiv.appendChild(document.createElement("h2"))
cartTotal.classList.add("cartTotal")
cartTotal.innerHTML = "Panier total : " + Math.round(cart*100)/100 + "€"

// Création du bouton "vider votre panier"
let emptyButton = cartDiv.appendChild(document.createElement("button"))
emptyButton.classList.add("btn" , "btn-danger" , "mx-auto")
emptyButton.innerHTML = "Vider votre panier"


// Fonction qui vide le localStorage et enlève les lignes du panier
emptyButton.addEventListener("click", () => {
    localStorage.clear()
    for (let i = allCartLine.length ; i-- > 0;) {
        allCartLine[i].parentNode.removeChild(allCartLine[i])
        cartTotal.innerHTML = "Panier total : 0€"
    }
})


// Fonction qui ermets d'envoyer une requête POST toutes les informations de l'utilisateur s'il y a aucune erreur dans les inputs
button.addEventListener("click", (e) => {
    e.preventDefault()
    for (let i = allSmallBalise.length ; i-- > 0;) {
        allSmallBalise[i].parentNode.removeChild(allSmallBalise[i])
    }
    confirmForm = true
    filterInputUser(2,30, form.lastName.value, /\d/g, "lastNameForm",smallBaliseLastName, "le nom de famille")
    filterInputUser(2,30, form.firstName.value, /\d/g, "firstNameForm",smallBaliseFirstName, "le prénom")
    filterInputUser(5,100, form.address.value, /A-zÀ-ÿ/g, "addressForm",smallBaliseAddress, "l'adresse")
    filterInputUser(3,40, form.city.value, /\d/g, "cityForm",smallBaliseCity, "la ville")
    filterInputUser(5,60, form.email.value, mailRegex, "emailForm",smallBaliseEmail, "l'email")
    console.log(confirmForm)

    // S'il y a des produits dans le localStorage et qu'il n'y a aucune erreur dans les inputs, crée un order avec le contact et les produits
    if (confirmForm && productinStorage) {
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

        // Envoie des informations et attente d'une promesse qu'on parse et qu'on mets dans le localStorage
        fetch("http://localhost:3000/api/cameras/order", headers)
        .then((response) => response.json()
        .then((data) => {
            localStorage.removeItem("products")
            data.totalPrice = cart
            localStorage.setItem("contact", JSON.stringify(data))
            window.location.href = "confirmation.html"
        }))
    } else {
        e.preventDefault()
    }
    })

