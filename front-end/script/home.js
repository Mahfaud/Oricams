var httpRequest = new XMLHttpRequest()

httpRequest.open("GET", "http://localhost:3000/api/cameras", true)
httpRequest.send()

var camsContainer = document.querySelector("#camsContainer")

httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == 4) {
        var response = JSON.parse(httpRequest.responseText)
        for(var i = 0; i < response.length; i++) {
            let link = document.createElement("a")
            let newLink = camsContainer.appendChild(link)
            newLink.setAttribute("href", "./product.html?id=" + response[i]._id)
            let div = document.createElement("div")
            let card = newLink.appendChild(div)
            card.classList.add("col", "card", "f-wrap", "m-3")


            let img = document.createElement("img")
            let newImg = card.appendChild(img)
            newImg.setAttribute("src", response[i].imageUrl)
            newImg.setAttribute("alt", "Caméra Vintage " +  response[i]._id)
            newImg.classList.add("card-img-top")

            cardBody = card.appendChild(document.createElement("div"))
            cardBody.classList.add("card-body")

            cardTitle = cardBody.appendChild(document.createElement("h5"))
            cardTitle.classList.add("card-title")
            cardTitle.innerHTML = response[i].name

            cardDescription = card.appendChild(document.createElement("p"))
            cardDescription.classList.add("card-text")
            price = String(response[i].price / 10000) + " €"
            cardDescription.innerHTML = price
        }
    }
}
