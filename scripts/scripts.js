const API_KEY = "api_key=mx4gn2iQTNftWR0pUTRxLcQj8kdcxqRp";
const REST = "&limit=20&offset=0&rating=R&lang=en";
const URL = "https://api.giphy.com/v1/gifs/search?";

searchBar = document.getElementById("searchTextField");
searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", doTheSearch);
header = document.getElementById("header");
selectedGif = document.getElementById("readOnlyLink");
messagePlace = document.getElementById("message");

gifList = document.getElementById("gifplace");

function copyThisLink(id){
    let toCopy = "https://media.giphy.com/media/" + id + "/source.gif";
    selectedGif.value = toCopy;
    selectedGif.select();
    document.execCommand("copy");
    messagePlace.innerText = "Copied to Clipboard!";
}

function addGifToList(gif){
    let newGif = document.createElement("img");
    newGif.src = "https://media.giphy.com/media/" + gif.id + "/source.gif";
    newGif.style.maxWidth = "200px";
    newGif.style.maxHeight = "200px";
    newGif.style.width = "auto";
    newGif.style.height = "auto";
    // newGif.style.margin = "10px";
    newGif.addEventListener("click",() => copyThisLink(gif.id));
    gifList.appendChild(newGif);
}

function doTheSearch() {
    let q = "q=" + searchBar.value;
    let request = new XMLHttpRequest();
    let url_string = URL + API_KEY + "&" + q + REST;
    request.open('GET', url_string, false);
    request.onload = function(){
        let data = JSON.parse(this.response).data;

        console.log(data);
        data.forEach(gif => {addGifToList(gif)});
    };
    while (gifList.firstChild) {
        gifList.removeChild(gifList.firstChild);
    }
    request.send();
}