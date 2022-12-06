const main = document.querySelector("main")
const btnAnterior = document.querySelector("#Btn-anterior")
const btnSiguiente = document.querySelector("#Btn-siguiente")
let pagina = 1


btnSiguiente.addEventListener("click", () => {
    if(pagina < 42) {
        const article = document.querySelectorAll("article")
        article.forEach( e => e.remove())
        pagina += 1;
        loadCharacters()
    }
})

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
        console.log("nashe")
        const article = document.querySelectorAll("article")
        article.forEach( e => e.remove())
		pagina -= 1;
		loadCharacters();
	}
});

async function loadCharacters () {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`)
    // console.log(response)

    const data = await response.json()
    ponerPersonajes(data)
}



// loadCharacters(function(data) {
//     data.results.forEach( personajes => {

//         const article = document.createRange().createContextualFragment(`
//         <article>
//             <div class="image-container">
//             <img src="${personajes.image}" alt="Personaje">
//             </div>
            
//             <h2>${personajes.name}</h2>
//             <p>${personajes.status}</p>
//         </article>
//         `)


//         main.append(article) 
//     })
// })

function ponerPersonajes(data) {
    data.results.forEach( personajes => {

        const article = document.createRange().createContextualFragment(`
        <article>
            <div class="image-container">
            <img src="${personajes.image}" alt="Personaje">
            </div>
            
            <h2>${personajes.name}</h2>
            <p>${personajes.status}</p>
        </article>
        `)
        main.append(article) 
    })
}

loadCharacters()
