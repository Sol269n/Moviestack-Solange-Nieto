import { mostrarCard } from "./module/funciones.js"

//FETCH

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
        div.innerHTML = mostrarCard(listaFavoritos, div) 

        actualizarEstadoBotones()
    })
    .catch((error) => console.log("Mensaje error:", error))

    contenedor.addEventListener("click",(event) => {
        //console.log("hola") // detecta el click y da hola la primera vez
        //console.log(peliculas) //me trae el array despues del click
    
        if (event.target.tagName === "BUTTON") {
            const boton = event.target
            //console.log(boton) //
            const peliculaId = boton.dataset.peliculaid
            //console.log(peliculaId) //obtiene id de card
    
            listaFavoritos = listaFavoritos.filter(pelicula => pelicula.id !== peliculaId)
            localStorage.setItem("listaFavoritos", JSON.stringify(listaFavoritos))
            div.innerHTML = mostrarCard(listaFavoritos, div) 
            actualizarEstadoBotones()
        }

    })



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