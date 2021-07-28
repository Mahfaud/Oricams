var httpRequest = new XMLHttpRequest()

httpRequest.open("GET", "http://localhost:3000/api/cameras", true)
httpRequest.send()

var camsContainer = document.querySelector("#camsContainer")

httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == 4) {
        var response = JSON.parse(httpRequest.responseText)
        for(var i = 0; i < response.length; i++) {
            let newLink = camsContainer.appendChild(document.createElement("a"))
            newLink.setAttribute("href", "./product.html?id=" + response[i]._id)
            let card = newLink.appendChild(document.createElement("div"))
            newLink.classList.add("col-12" , "col-md-5", "card", "f-wrap", "m-3")

            let newImg = card.appendChild(document.createElement("img"))
            newImg.setAttribute("src", response[i].imageUrl)
            newImg.setAttribute("alt", "Caméra Vintage " +  response[i]._id)
            newImg.classList.add("card-img-top")

            cardBody = card.appendChild(document.createElement("div"))
            cardBody.classList.add("card-body", "row")

            cardTitle = cardBody.appendChild(document.createElement("h5"))
            cardTitle.classList.add("card-title" , "mr-auto")
            cardTitle.innerHTML = response[i].name

            cardDescription = cardBody.appendChild(document.createElement("p"))
            cardDescription.classList.add("card-text")
            price = String(response[i].price / 10000) + " €"
            cardDescription.innerHTML = price
        }
    }
}
