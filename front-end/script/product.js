var params = new URL(document.location).searchParams;
var id = params.get("id");

var product = document.getElementById("product")

// Création d'une fonction asynchrone "oneCamera" qui fait un appel à l'API pour afficher une seule caméra en HTML
let oneCamera = async () => {
    try {
        let response = await fetch("http://localhost:3000/api/cameras/" + id)
        if (response.ok) {
            // Traitement de la donnée une fois reçu
            let data = await response.json()

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
    
            // Création d'un bouton dans le corps de la card et lui ajoute des classes Bootstrap et des attributs
            cardButton = cardBody.appendChild(document.createElement("button"))
            cardButton.innerHTML = "Ajouter au panier"
            cardButton.setAttribute("type", "button")
            cardButton.classList.add("btn", "btn-md", "bg-secondary", "text-light", "my-3", "ml-auto")
    
            let button = document.querySelector(".btn")
            // Ajoute le produit dans le localStorage losqu'on clique sur le bouton
            button.addEventListener("click", () => {
                let lens = document.querySelector(".form-control").value
                // Crée un objet product avec les choix de l'utilisateur
                let product = {
                    nomProduit: data.name, 
                    prixProduit : data.price / 10000,
                    lentilleProduit : lens,
                    idProduit : data._id,
                }
                
                // Parse le contenu de la clé "product" dans le localStorage et le met dans une variable
                let productInStorage = JSON.parse(localStorage.getItem("product"));
                
                // Si productInStorage n'est pas égal à null alors on push le produit créé dans l'array et on renvoie le JSON modifié dans le localStorage
                if (productInStorage) {
                    productInStorage.push(product)
                    localStorage.setItem("product", JSON.stringify(productInStorage))
                // Si productInStorage est égal à null alors on crée une array ou l'on va push le produit créé puis on renvoie le JSON dans le localStorage
                } else {
                    productInStorage = []
                    productInStorage.push(product)
                    localStorage.setItem("product", JSON.stringify(productInStorage))
                }
            })
        } else {
            console.log("Erreur" + response.status) 
        }
    } catch {
        console.log("Erreur")
    }
}

oneCamera()