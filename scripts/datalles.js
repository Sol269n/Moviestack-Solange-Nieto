const URLParams = new URLSearchParams(location.search)
const id = URLParams.get("id")

const detallePelicula = peliculas.find(pelicula => pelicula.id == id)
const contDetalle = document.getElementById("contenedorDetalles")

contDetalle.className = " flex flex-wrap justify-center p-5 gap-3 text-white"


contDetalle.innerHTML = `
<section class= "flex flex-wrap gap-10"> 
    <img class="w-[400px] rounded" src="${detallePelicula.image}" alt="${detallePelicula.title}">
    <div class="w-80">
        <h3 class="font-medium">${detallePelicula.title}</h3>
        <h4 class="font-semibold py-0.5">${detallePelicula.tagline}</h4>
        <p class="italic py-3">${detallePelicula.genres}</p>
        <p>${detallePelicula.overview}</p>
    </div>
</section>
<section class= "flex flex-wrap gap-10">
    <table class="table-auto w-[400px] border-collapse border border-slate-500">
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
    <table class="w-80 border-collapse border border-slate-500">
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