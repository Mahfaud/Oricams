var params = new URL(document.location).searchParams;
var id = params.get("id");
var addProductAlert = document.createElement("small")
var main = document.querySelector("main")
let productInStorage = JSON.parse(localStorage.getItem("products"));


// Fonction qui supprime le spinner
function hideSpinner() {
    let spinner = document.getElementById("spinner")
    spinner.parentNode.removeChild(spinner)
}

// Fonction qui ajoute ou modifie le localStorage lorsqu'un produit est ajouté
function addToLocalStorage(product) {
    // Si productInStorage n'est pas égal à null alors on push le produit créé dans l'array et on renvoie le JSON modifié dans le localStorage
    if (productInStorage) {
        let sameProduct = false
        for (let i = 0; i < productInStorage.length; i++) {
            if (productInStorage[i].name == product.name && productInStorage[i].lens == product.lens) {
                console.log("Same")
                productInStorage[i].quantity += Number(product.quantity)
                productInStorage[i].price = Math.round((productInStorage[i].quantity * product.price)*100)/100
                localStorage.setItem("products", JSON.stringify(productInStorage))
                sameProduct = true
                break
            }
        }
        // Si le produit n'est pas le même après la boucle, ajoute le produit dans le localStorage
        if (!sameProduct) {
            console.log("Not same")
            product.price = Math.round((product.quantity * product.price)*100)/100
            productInStorage.push(product)
            localStorage.setItem("products", JSON.stringify(productInStorage))
        }  
    // Si productInStorage est égal à null alors on crée une array ou l'on va push le produit créé puis on renvoie le JSON dans le localStorage
    } else {
        productInStorage = []
        product.price = Math.round((product.quantity * product.price)*100)/100
        productInStorage.push(product)
        localStorage.setItem("products", JSON.stringify(productInStorage))
    }
}


// Création d'une fonction asynchrone "oneCamera" qui fait un appel à l'API pour afficher une seule caméra en HTML
let oneCamera = async () => {
    try {
        let response = await fetch("http://localhost:3000/api/cameras/" + id)
        if (response.ok) {
            // Traitement de la donnée une fois reçu
            let data = await response.json()

            // On enleve la classe main pour remettre la taille auto au main
            main.classList.remove("main")
            hideSpinner()

            // Création de la card du produit
            let product = main.appendChild(document.createElement("div"))
            product.classList.add("col", "m-4", "card")

            // Crée une nouvelle image qui sera l'enfant de la balise product et lui ajoute des classes Bootstrap et des attributs
            productImg = product.appendChild(document.createElement("img"))
            productImg.classList.add("row", "card-header")
            productImg.setAttribute("src", data.imageUrl)
            productImg.setAttribute("alt", "Caméra vintage " + data.name)
            
            // Crée une div au produit qui servira de corps pour la card et lui ajoute des classes Bootstrap
            cardBody = product.appendChild(document.createElement("div"))
            cardBody.classList.add("card-body")
    
            // Crée un titre au corps de la card
            cardTitle = cardBody.appendChild(document.createElement("h3"))
            cardTitle.innerHTML = data.name
    
            // Crée un titre contenant le prix dans le corps de la card et lui ajoute des classes Bootstrap
            cardPrice = cardBody.appendChild(document.createElement("h4"))
            cardPrice.innerHTML = String(data.price / 10000) + " €"
            cardPrice.classList.add("card-text")
    
            // Crée un paragraphe qui servira de description dans le corps de la card
            cardDescription = cardBody.appendChild(document.createElement("p"))
            cardDescription.innerHTML = data.description
            cardDescription.classList.add("card-text")
            
            //  Crée une liste déroulante avec les différentes lentilles et ajoute des classes Bootstrap
            productLenses = cardBody.appendChild(document.createElement("select"))
            productLenses.classList.add("form-control")
            for (let i = 0; i < data.lenses.length; i++) {
                let options = productLenses.appendChild(document.createElement("option"))
                options.innerHTML = data.lenses[i]
            }
            
            // Création d'une liste pour les quantités de caméras
            let productQuantity = cardBody.appendChild(document.createElement("select"))
            productQuantity.classList.add("productQuantity")
            for (let i = 1; i < 5; i++) {
                let options = productQuantity.appendChild(document.createElement("option"))
                options.innerHTML = i
            }

            // Création d'un bouton dans le corps de la card et lui ajoute des classes Bootstrap et des attributs
            cardButton = cardBody.appendChild(document.createElement("button"))
            cardButton.innerHTML = "Ajouter au panier"
            cardButton.setAttribute("type", "button")
            cardButton.classList.add("btn", "btn-md", "bg-secondary", "text-light", "my-3", "ml-auto")
    
            let button = document.querySelector(".btn")
            // Ajoute le produit dans le localStorage losqu'on clique sur le bouton
            button.addEventListener("click", () => {
                let cardAddAlert = cardBody.appendChild(addProductAlert)
                cardAddAlert.classList.add("text-success", "ml-3")
                cardAddAlert.innerHTML = "Produit ajouté au panier"
                setTimeout(() => {
                    cardAddAlert.parentNode.removeChild(cardAddAlert)
                }, 1600)
                let lens = document.querySelector(".form-control").value
                let quantity = Number(document.querySelector(".productQuantity").value)
                // Crée un objet product avec les choix de l'utilisateur
                let product = {
                    name: data.name, 
                    price : (data.price / 10000),
                    lens : lens,
                    _id : data._id,
                    quantity: quantity 
                }
                
                // Si productInStorage n'est pas égal à null alors on push le produit créé dans l'array et on renvoie le JSON modifié dans le localStorage
                addToLocalStorage(product)
            })
        } else {
            document.body.innerHTML = "Error " + response.status
        }
    } catch {
        hideSpinner()
        let errorTitle = main.appendChild(document.createElement("h1"))
        errorTitle.innerHTML = "Impossible d'afficher la caméra ! Le serveur ne répond pas ! Réésayez plus tard"
    }
}

oneCamera()