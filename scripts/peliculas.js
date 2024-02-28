console.log(peliculas)

const main = document.getElementById("contenedor-main")

const div = document.createElement("div")
div.id = "contenedor"
div.className = "flex flex-wrap justify-center p-5 gap-3"

main.appendChild(div)

function crearCard(pelicula){
    return`
    <article class="w-80 flex flex-col gap-2 p-2 text-white border rounded border-slate-800 bg-slate-900 "> 
        <img class="rounded" src="${pelicula.image}" alt="${pelicula.title}">
        <h3 class="font-medium bg-slate-800 text-center">${pelicula.title}</h3>
        <h4 class="font-semibold">${pelicula.tagline}</h4>
        <p>${pelicula.overview}</p>
        <a class="hover:text-fuchsia-600" href="./detalles_peliculas.html?id=${pelicula.id}">See more...</a>
    </article>
    `
}

function mostrarCard(listaPeliculas, elemento){
    let cardCont = ""
    for (const pelicula of listaPeliculas){
        cardCont += crearCard(pelicula)
    }
    if(listaPeliculas.length == 0){
        cardCont = `<h2 class="font-semibold text-white text-2xl">no movies found</h2>`
    }
    
    return cardCont
}
div.innerHTML = mostrarCard(peliculas, div)

//[Filtros y busqueda]

const inputBusqueda = document.getElementById("inputBusqueda")
const contSelect = document.getElementById("contenedorSelect")

//Obtendo generos y saco repetidos
const genres = peliculas.map( pelicula => pelicula.genres).flat()

const genresSet = new Set(genres) //Nota: permite almacenar valores unicos e iterar (por el cual saca los repetidos)
const arrayGenres = Array.from(genresSet) // Convierto en array el set.

//creo options para el select y retorno
function crearSelect(genres){
    return`
    <option value="${genres}">${genres}</option>
    `
}

const fnReduce =(template, genres) => template + crearSelect(genres)
contSelect.innerHTML +=  arrayGenres.reduce(fnReduce, "" )

//filtro peliculas por nombre

inputBusqueda.addEventListener("input", () =>{
    console.log("input buscador: ", inputBusqueda.value)
    const moviesFiltradosG = filtrarMoviesPorGenero(peliculas, contSelect.value)
    const moviesFiltradosN = filtroMoviesPorNombre(moviesFiltradosG, inputBusqueda.value)
    
    div.innerHTML = mostrarCard(moviesFiltradosN, div)
})

function filtroMoviesPorNombre(listaPeliculas, nombre){
    return listaPeliculas.filter(pelicula => pelicula.title.toLowerCase().startsWith(nombre.toLowerCase()))
}

//escucho y filtro por genero
contSelect.addEventListener("change",() => {
    const moviesFiltradosG = filtrarMoviesPorGenero(peliculas, contSelect.value)
    div.innerHTML = mostrarCard(moviesFiltradosG, div)

})

function filtrarMoviesPorGenero(listaPeliculas, genero){
    if(genero.length == 0){
        return listaPeliculas

    }else{
        return listaPeliculas.filter(pelicula => pelicula.genres.includes(genero))
    }

}
