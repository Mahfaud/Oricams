let camsContainer = document.querySelector("#camsContainer")
let main = document.querySelector(".main")
// Création d'une fonction asynchrone "camera" qui fait un appel à l'API des caméras pour ensuite les afficher en HTML
let camera = async () => {
    try {
        let response = await fetch("http://localhost:3000/api/cameras")
        if (response.ok) {
            hideSpinner()
            main.classList.remove("main")
            // Traitement de la donnée une fois reçu
            let data = await response.json()
            // Loop For qui fait affiche les données en HTML jusqu'a la fin des objets
            for(var i = 0; i < data.length; i++) {
                // Crée une nouvelle balise "a" qui sera l'enfant de camsContainer
                let newLink = camsContainer.appendChild(document.createElement("a"))
                newLink.setAttribute("href", "./product.html?id=" + data[i]._id)
                // Crée une nouvelle balise div qui sera l'enfant de la balise "a" qui a été créé précedemment et ajout de classes Bootstrap
                let card = newLink.appendChild(document.createElement("div"))
                newLink.classList.add("col-12" , "col-md-5", "card", "f-wrap", "m-3")
    
    
                // Crée une nouvelle image qui sera l'enfant de la balise "div" qui a été créé précedemment et ajout d'attributs et de classes à l'image créé précedemment
                let newImg = card.appendChild(document.createElement("img"))
                newImg.setAttribute("src", data[i].imageUrl)
                newImg.setAttribute("alt", "Caméra Vintage " +  data[i]._id)
                newImg.classList.add("card-img-top")
    
                // Ajout du corps de la card qui a été créé précedemment et ajout de classes Bootstrap
                cardBody = card.appendChild(document.createElement("div"))
                cardBody.classList.add("card-body", "row")
    
                // Ajout d'un titre h5 au corps de la card et ajout de classes Bootstrap
                cardTitle = cardBody.appendChild(document.createElement("h5"))
                cardTitle.classList.add("card-title" , "mr-auto")
                cardTitle.innerHTML = data[i].name
    
                // Ajout d'un paragraphe qui contient le prix de la caméra au corps de la card et ajout de classes Bootstrap
                cardDescription = cardBody.appendChild(document.createElement("p"))
                cardDescription.classList.add("card-text")
                price = String(data[i].price / 10000) + " €"
                cardDescription.innerHTML = price
            } 
        } else {
            document.body.innerHTML = "Error " + response.status
        }
    } catch {
        hideSpinner()
        let errorTitle = camsContainer.appendChild(document.createElement("h1"))
            errorTitle.innerHTML = "Impossible d'afficher les caméras ! Le serveur ne répond pas ! Réésayez plus tard"
    }

}


function hideSpinner() {
    let spinner = document.getElementById("spinner")
    spinner.parentNode.removeChild(spinner)
}

camera()