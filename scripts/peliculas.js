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
div.innerHTML = mostrarCard()

