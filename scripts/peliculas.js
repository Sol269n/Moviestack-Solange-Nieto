console.log(peliculas)

const main = document.getElementById("contenedor-main")

const div = document.createElement("div")
div.id = "contenedor"
div.className = "flex flex-wrap justify-center p-5 gap-3"


main.appendChild(div)
const llamoDiv = document.getElementById("contenedor")

function crearCard(pelicula){
    return`
    <article class="w-80 flex flex-col gap-2 p-2 text-white border rounded bg-slate-900 "> 
        <img src="${pelicula.image}" alt="${pelicula.title}">
        <h3 class="font-medium">${pelicula.title}</h3>
        <h4 class="font-semibold">${pelicula.tagline}</h4>
        <p>${pelicula.overview}</p>
    </article>
    `
}

function mostrarCard(){
    let cardCont = ""
    for (const pelicula of peliculas){
        cardCont += crearCard(pelicula)
    }
    return cardCont
}
contenedor.innerHTML = mostrarCard()

function card(pelicula){
    const article = document.createElement("article")
    article.className = "flex flex-wrap"
    return article
}
