var params = new URL(document.location).searchParams;
var id = params.get("id");

var httpRequest = new XMLHttpRequest()

httpRequest.open("GET", "http://localhost:3000/api/cameras/" + id, true)
httpRequest.send()

var product = document.getElementById("product")

httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == 4) {
        var response = JSON.parse(httpRequest.responseText)

        productImg = product.appendChild(document.createElement("img"))
        productImg.classList.add("row", "card-header")
        productImg.setAttribute("src", response.imageUrl)
        productImg.setAttribute("alt", "Caméra vintage " + response.name)

        cardBody = product.appendChild(document.createElement("div"))
        cardBody.classList.add("card-body")

        cardTitle = cardBody.appendChild(document.createElement("h3"))
        cardTitle.innerHTML = response.name

        cardPrice = cardBody.appendChild(document.createElement("h4"))
        cardPrice.innerHTML = String(response.price / 10000) + " €"
        cardPrice.classList.add("card-text")

        cardDescription = cardBody.appendChild(document.createElement("p"))
        cardDescription.innerHTML = response.description
        cardDescription.classList.add("card-text")
        
        productLenses = cardBody.appendChild(document.createElement("select"))
        productLenses.classList.add("form-control")
        for (let i = 0; i < response.lenses.length; i++) {
            let options = productLenses.appendChild(document.createElement("option"))
            options.innerHTML = response.lenses[i]
        }

        cardButton = cardBody.appendChild(document.createElement("button"))
        cardButton.innerHTML = "Ajouter au panier"
        cardButton.setAttribute("type", "button")
        cardButton.classList.add("btn", "btn-md", "bg-secondary", "text-light", "my-3", "ml-auto")

        let button = document.querySelector(".btn")
        button.addEventListener("click", () => {
            let lens = document.querySelector(".form-control").value
            let product = {
                nomProduit: response.name, 
                prixProduit : response.price / 10000,
                lentilleProduit : lens,
                idProduit : response._id,
            }
            
            let productInStorage = JSON.parse(localStorage.getItem("product"));

            if (productInStorage) {
                productInStorage.push(product)
                localStorage.setItem("product", JSON.stringify(productInStorage))
            } else {
                productInStorage = []
                productInStorage.push(product)
                localStorage.setItem("product", JSON.stringify(productInStorage))
            }
        })
    }
}
