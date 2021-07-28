var params = new URL(document.location).searchParams;
var id = params.get("id");

var httpRequest = new XMLHttpRequest()

httpRequest.open("GET", "http://localhost:3000/api/cameras/" + id, true)
httpRequest.send()