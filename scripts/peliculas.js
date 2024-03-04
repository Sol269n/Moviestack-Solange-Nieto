import { 
    mostrarCard,
    obtenerGeneros,
    fnReduce,
    filtroMoviesPorNombre,
    filtrarMoviesPorGenero,
} from "./module/funciones.js"

//FETCH
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
        div.innerHTML = mostrarCard(peliculas, div) 
        const arrayGenres = obtenerGeneros(peliculas)
        contSelect.innerHTML += arrayGenres.reduce(fnReduce, "" )   
    })
    .catch((error) => console.log("Mensaje error:", error))
//

const main = document.getElementById("contenedor-main")
const div = document.createElement("div")
div.id = "contenedor"
div.className = "flex flex-wrap justify-center p-5 gap-3"
main.appendChild(div)

//[Filtros y busqueda]
const inputBusqueda = document.getElementById("inputBusqueda")
const contSelect = document.getElementById("contenedorSelect")

//escucho y filtro por nombre
inputBusqueda.addEventListener("input", () =>{
    const moviesFiltradosG = filtrarMoviesPorGenero(peliculas, contSelect.value)
    const moviesFiltradosN = filtroMoviesPorNombre(moviesFiltradosG, inputBusqueda.value)

    div.innerHTML = mostrarCard(moviesFiltradosN, div)
})
//escucho y filtro por genero
contSelect.addEventListener("change",() => {
    const moviesFiltradosG = filtrarMoviesPorGenero(peliculas, contSelect.value)
    const moviesFiltradosN = filtroMoviesPorNombre(moviesFiltradosG, inputBusqueda.value)

    div.innerHTML = mostrarCard(moviesFiltradosN, div)

})

///
//const botones = document.querySelectorAll("button")

let listaFavoritos = JSON.parse(localStorage.getItem("listaFavoritos")) || []
console.log(peliculas)

contenedor.addEventListener("click",(event) => {
    console.log("hola")

    if (event.target.tagName === "BUTTON") {
        const boton = event.target
        console.log(boton)

        const peliculaId = boton.dataset.id
        const peliculaFavorita = peliculas.find(pelicula => pelicula.id == peliculaId)
        console.log(peliculaFavorita)

        if (boton.textContent === "♡") {
          boton.textContent = "❤️"
          boton.className = "absolute top-0 left-0 mt-0.5 ml-2 text-xl text-white"
          listaFavoritos.push(peliculaFavorita)
        } else {
          boton.textContent = "♡"
          boton.className = "absolute top-0 left-0 mt-0.5 ml-2 text-3xl text-white"
          listaFavoritos = listaFavoritos.filter(pelicula => pelicula.id !== peliculaId)
        }
      }

    localStorage.setItem("listaFavoritos", JSON.stringify(listaFavoritos))
    console.log("Lista de favoritos actualizada:", listaFavoritos)
})