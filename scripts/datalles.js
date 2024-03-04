import {crearDetalles} from "./module/funciones.js"

const contDetalle = document.getElementById("contenedorDetalles")
contDetalle.className = "w-full flex flex-wrap justify-center p-5 gap-3 text-white"

let peliculas = []

const url = "https://moviestack.onrender.com/api/movies"
const init = {
    method: "GET",
    headers: {
        "x-api-key" : "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"
    }
}

fetch(url, init)
    .then(response => response.json())
    .then((datos) => {
        peliculas = datos.movies
        
        const URLParams = new URLSearchParams(location.search)
        const id = URLParams.get("id")
        const detallePelicula = peliculas.find(pelicula => pelicula.id == id)

        contDetalle.innerHTML = crearDetalles(detallePelicula)
    })
    .catch((error) => console.log("Mensaje error:", error))



