//creo y muestro cards
export function crearCard(pelicula){
    return`
    <article class="w-80 flex flex-col gap-2 p-2 text-white border rounded border-slate-800 bg-slate-900 ">
        <div class="relative">
        <img class="rounded" src="https://moviestack.onrender.com/static/${pelicula.image}" alt="${pelicula.title}">
        <button data-peliculaId="${pelicula.id}" class="absolute top-0 left-0 mt-0.5 ml-2 text-3xl text-white">♡</button> 
        </div>
        <h3 class="font-medium bg-slate-800 text-center">${pelicula.title}</h3>
        <h4 class="font-semibold">${pelicula.tagline}</h4>
        <p>${pelicula.overview}</p>
        <a class="hover:text-fuchsia-600" href="./detalles_peliculas.html?id=${pelicula.id}">See more...</a>
    </article>
    `
}

export function mostrarCard(listaPeliculas, elemento){
    let cardCont = ""
    for (const pelicula of listaPeliculas){
        cardCont += crearCard(pelicula)
    }
    if(listaPeliculas.length == 0){
        cardCont = `<h2 class="font-semibold text-white text-2xl">no movies found</h2>`
    }
    
    return cardCont
}
//creo options para el select y retorno
export function obtenerGeneros(peliculas){
    const genres = peliculas.map( pelicula => pelicula.genres).flat()
    const genresSet = new Set(genres) //Nota: permite almacenar valores unicos e iterar (por el cual saca los repetidos)
    return Array.from(genresSet) // Convierto en array el set.
}

export function crearSelect(genres){
    return`
    <option value="${genres}">${genres}</option>
    `
}
export const fnReduce =(template, genres) => template + crearSelect(genres)

//filtros
export function filtroMoviesPorNombre(listaPeliculas, nombre){
    return listaPeliculas.filter(pelicula => pelicula.title.toLowerCase().startsWith(nombre.toLowerCase()))
}

export function filtrarMoviesPorGenero(listaPeliculas, genero){
    if(genero.length == 0){
        return listaPeliculas

    }else{
        return listaPeliculas.filter(pelicula => pelicula.genres.includes(genero))
    }
}

//crear detalles
export function crearDetalles(detallePelicula){
    return `
    <section class= " flex flex-wrap gap-10"> 
        <img class="w-1/2 h-70 rounded object-cover" src="https://moviestack.onrender.com/static/${detallePelicula.image}" alt="${detallePelicula.title}">
        <div class="w-2/5 h-70">
            <h3 class="font-medium">${detallePelicula.title}</h3>
            <h4 class="font-semibold py-0.5">${detallePelicula.tagline}</h4>
            <p class="italic py-3">${detallePelicula.genres}</p>
            <p>${detallePelicula.overview}</p>
        </div>
    </section>
    <section class= "flex flex-wrap gap-10">
        <table class="w-1/2 border-collapse border border-slate-500">
            <thead class=" border-collapse border border-slate-500">
                <tr>
                    <th class="border border-slate-600">Original language</th>
                    <th class="border border-slate-600">Release date</th>
                    <th class="border border-slate-600">Runtime</th>
                    <th class="border border-slate-600">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-center border border-slate-600">${detallePelicula.original_language}</td>
                    <td class="text-center border border-slate-600">${detallePelicula.release_date}</td>
                    <td class="text-center border border-slate-600">${detallePelicula.runtime}</td>
                    <td class="text-center border border-slate-600">${detallePelicula.status}</td>
                </tr>
            </tbody>
        </table>
        <table class="w-2/5 border-collapse border border-slate-500">
            <thead class="border-collapse border border-slate-500">
                <tr>
                    <th class="border border-slate-600">Votage average</th>
                    <th class="border border-slate-600">Budget</th>
                    <th class="border border-slate-600">Revenue</th>
                </tr>
            </thead>
            <tbody class"">
                <tr>
                    <td class="text-center border border-slate-600">${detallePelicula.vote_average}</td>
                    <td class="text-center border border-slate-600">${detallePelicula.budget}</td>
                    <td class="text-center border border-slate-600">${detallePelicula.revenue}</td>
                </tr>
            </tbody>
        </table>
    </section>
    `
}


///
