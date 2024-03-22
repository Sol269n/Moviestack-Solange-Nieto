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
        //console.log(peliculas)
        div.innerHTML = mostrarCard(peliculas, div) 
        const arrayGenres = obtenerGeneros(peliculas)
        contSelect.innerHTML += arrayGenres.reduce(fnReduce, "" ) 
        
        // Llamar a la función para actualizar el estado de los botones
        actualizarEstadoBotones()
        
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
    actualizarEstadoBotones()
})
//escucho y filtro por genero
contSelect.addEventListener("change",() => {
    const moviesFiltradosG = filtrarMoviesPorGenero(peliculas, contSelect.value)
    const moviesFiltradosN = filtroMoviesPorNombre(moviesFiltradosG, inputBusqueda.value)

    div.innerHTML = mostrarCard(moviesFiltradosN, div)
    actualizarEstadoBotones()

})

///
//const botones = document.querySelectorAll("button")

let listaFavoritos = JSON.parse(localStorage.getItem("listaFavoritos")) || []
console.log(listaFavoritos) //revisando lista me guarda cosas vacias null
//console.log(peliculas) //no me trae nada, array vacio

contenedor.addEventListener("click",(event) => {
    //console.log("hola") // detecta el click y da hola la primera vez
    //console.log(peliculas) //me trae el array despues del click

    if (event.target.tagName === "BUTTON") {
        const boton = event.target
        //console.log(boton) //
        const peliculaId = boton.dataset.peliculaid
        //console.log(peliculaId) //obtiene id de card

        marcarFavorito(boton, peliculaId)
    }
})

function marcarFavorito(boton, peliculaId){
    const peliculaFavorita = peliculas.find(pelicula => pelicula.id == peliculaId)
        //console.log(peliculaFavorita)
    if (boton.textContent === "♡") {
        boton.textContent = "❤️"
        boton.className += "absolute top-0 left-0 mt-0.5 ml-2 text-xl text-white"
        listaFavoritos.push(peliculaFavorita)
      } else {
        boton.textContent = "♡"
        boton.className += "absolute top-0 left-0 mt-0.5 ml-2 text-3xl text-white"
        listaFavoritos = listaFavoritos.filter(pelicula => pelicula.id !== peliculaId)
      }
      localStorage.setItem("listaFavoritos", JSON.stringify(listaFavoritos))
      console.log("Lista de favoritos actualizada:", listaFavoritos) // revisando lista
}




// Elimina la redefinición de la variable listaFavoritos dentro de la función actualizarEstadoBotones

export function actualizarEstadoBotones() {
    console.log("Función actualizarEstadoBotones ejecutada al cargar la página")
    // Obtener la lista de favoritos del localStorage
    const listaFavoritosLocal = JSON.parse(localStorage.getItem("listaFavoritos")) || []

    console.log("Lista de favoritos cargada:", listaFavoritosLocal)

    // Iterar sobre todos los botones y actualizar su estado
    document.querySelectorAll("button[data-peliculaId]").forEach(boton => {
        const peliculaId = boton.dataset.peliculaid
        // Verificar si la película está en la lista de favoritos
        const esFavorito = listaFavoritosLocal.some(pelicula => pelicula.id == peliculaId)
        // Actualizar el estado del botón
        if (esFavorito) {
            boton.textContent = "❤️"
            boton.classList.add("text-xl", "text-white")
        } else {
            boton.textContent = "♡"
            boton.classList.remove("text-xl", "text-white")
        }
    })
}