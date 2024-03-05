import { mostrarCard } from "./module/funciones.js"

//FETCH
let peliculas = []

const url = "https://moviestack.onrender.com/api/movies"
const init = {
    method: "GET",
    headers: {
        "x-api-key" : "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"
    }
}

const main = document.getElementById("contenedor-main")
const div = document.createElement("div")
div.id = "contenedor"
div.className = "flex flex-wrap justify-center p-5 gap-3"
main.appendChild(div)


let listaFavoritos = JSON.parse(localStorage.getItem("listaFavoritos")) || []

fetch(url, init)
    .then(response => response.json())
    .then((datos) => {
        peliculas = datos.movies
        div.innerHTML = mostrarCard(listaFavoritos, div) 
    })
    .catch((error) => console.log("Mensaje error:", error))