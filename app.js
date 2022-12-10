const main = document.querySelector("main")
const elementosHijos = document.querySelectorAll("#pagination > ul > .numb");
const btnNext = document.querySelector(".btn-next")
const btnPrev = document.querySelector(".btn-prev")
const firstNumb = document.querySelector(".first-number")

let next = "", prev = "";
let totalPages; 
let pagina = 1;
const API_URL =  `https://rickandmortyapi.com/api/character?page=${pagina}`

btnNext.addEventListener("click", nextPage)
btnPrev.addEventListener("click", previousPage)
elementosHijos.forEach((e, i) => {
    e.addEventListener("click", () => pagination(e, i))
})


async function loadCharacters (URL) {
    const response = await fetch(URL)
    // console.log(response)

    const data = await response.json()
    next = data.info.next
    prev = data.info.prev
    totalPages = data.info.pages
    document.querySelector(".last-number").textContent = totalPages

    // console.log(data)
    putCharactersDOM(data)
}

function putCharactersDOM(data) {
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

function ifContainsActive () {
    let valorIndice;
    elementosHijos.forEach( e => {
        if (e.classList.contains("active") )  valorIndice = e
    })
    return valorIndice
}

function removeActive () {
    elementosHijos.forEach( e => e.classList.remove("active"))
}

function clearMain () {
    const article = document.querySelectorAll("article")
    article.forEach( e => e.remove())
}

function previousPage () {
    if(prev != null) {
        clearMain()
        loadCharacters(prev)
        
        const valorIndice = ifContainsActive()
        const valorIndiceActive = valorIndice.previousSibling.previousElementSibling
        removeActive()
        valorIndiceActive.classList.add("active")
        
        if (valorIndice.textContent == 4) {
        } else if (elementosHijos[2].classList.contains("active")) {
            
            const num = Number(elementosHijos[2].textContent)
            removeActive()
            elementosHijos[3].classList.add("active")
            
            elementosHijos[1].textContent = num - 2
            elementosHijos[2].textContent = num - 1
            elementosHijos[3].textContent = num
            elementosHijos[4].textContent = num + 1
            elementosHijos[5].textContent = num + 2
        }
    }
}

function nextPage () {
    if(next != null) {
        clearMain()
        loadCharacters(next)

        const valorIndice = ifContainsActive()
        const valorIndiceActive = valorIndice.nextSibling.nextElementSibling
        removeActive()
        valorIndiceActive.classList.add("active")
        

        if (valorIndice.textContent == 39) {
        } else if (elementosHijos[4].classList.contains("active")) {


            const num = Number(elementosHijos[4].textContent)
            
            removeActive()
            elementosHijos[3].classList.add("active")
            
            elementosHijos[1].textContent = num - 2
            elementosHijos[2].textContent = num - 1
            elementosHijos[3].textContent = num
            elementosHijos[4].textContent = num + 1
            elementosHijos[5].textContent = num + 2
        }
    }
}

function reloadPageOne () {
    if (!firstNumb.classList.contains("active")) location.reload()
}

function pagination(e, i) {
    // removeActive()
    // e.classList.add("active")

    // pagina = Number(e.textContent)
    // const API_URL =  `https://rickandmortyapi.com/api/character?page=${pagina}`
    // clearMain()
    // loadCharacters(API_URL)

    if (i === 0) {
        reloadPageOne()
    } else { 
        pagina = Number(e.textContent)
        const API_URL =  `https://rickandmortyapi.com/api/character?page=${pagina}`
        clearMain()
        loadCharacters(API_URL)
    }

    removeActive()
    e.classList.add("active")


    // funcional ante-ultimo boton 'numb'
    if (i === 4 && (Number(e.textContent) <= totalPages - 3)) {
        const num = Number(e.textContent)
        
        removeActive()
        elementosHijos[3].classList.add("active")
        
        elementosHijos[3].textContent = e.textContent
        e.textContent = num + 1
        elementosHijos[5].textContent = num + 2

        // <== 
        const numMenor =  Number(elementosHijos[2].textContent)
        elementosHijos[1].textContent = numMenor
        elementosHijos[2].textContent = numMenor + 1
    } else if (i === 4 &&  !(i === 4 && (Number(e.textContent) <= totalPages - 3)) ) {
        removeActive()
        e.classList.add("active") // Al PEDO, POR AHORA
    }


    // funcional ultimo boton 'numb'
    if (i === 5 && (Number(e.textContent) <= totalPages - 3)) {
        const num = Number(e.textContent)
        removeActive()
        elementosHijos[3].classList.add("active")

        elementosHijos[3].textContent = e.textContent
        elementosHijos[4].textContent = num + 1
        e.textContent = num + 2

        // <== 
        const numMenor =  Number(elementosHijos[2].textContent)
        elementosHijos[1].textContent = numMenor + 1
        elementosHijos[2].textContent = numMenor + 2
    } else if (i === 5 && (i === 5 && (Number(e.textContent) == totalPages - 2)) ) {
        const num = Number(e.textContent)
        removeActive()
        elementosHijos[4].classList.add("active")
        
        elementosHijos[4].textContent = num
        e.textContent = num + 1

        // // <== 
        const numMenor =  Number(elementosHijos[2].textContent)
        elementosHijos[1].textContent = numMenor
        elementosHijos[2].textContent = numMenor + 1
        elementosHijos[3].textContent = numMenor + 2
    }


    // para atras  boton 2 'numb'
    if ( i === 2 && Number(e.textContent) > 3) {
        const num = Number(e.textContent) // 4
        
        removeActive()
        elementosHijos[3].classList.add("active")
        
        elementosHijos[1].textContent = num - 2
        elementosHijos[2].textContent = num - 1
        elementosHijos[3].textContent = num
        elementosHijos[4].textContent = num + 1
        elementosHijos[5].textContent = num + 2
    }

    // para atras  boton 1 'numb'

    if (i === 1 && Number(e.textContent) === 3) {
        const num = Number(e.textContent) // 3

        removeActive()
        elementosHijos[2].classList.add("active")

        elementosHijos[1].textContent = num - 1
        elementosHijos[2].textContent = num
        elementosHijos[3].textContent = num + 1
        elementosHijos[4].textContent = num + 2
        elementosHijos[5].textContent = num + 3


    } else if (i === 1 && Number(e.textContent) > 2) {
        const num = Number(e.textContent) // 3
        
        removeActive()
        elementosHijos[3].classList.add("active")
        
        elementosHijos[1].textContent = num - 2
        elementosHijos[2].textContent = num - 1
        elementosHijos[3].textContent = num
        elementosHijos[4].textContent = num + 1
        elementosHijos[5].textContent = num + 2
    }





    // Funcional ultimo boton 'last-number'
    if (i === 6) {
        const num = Number(e.textContent)
        console.log(num)
        elementosHijos[5].textContent = num - 1
        elementosHijos[4].textContent = num - 2
        elementosHijos[3].textContent = num - 3
        elementosHijos[2].textContent = num - 4
        elementosHijos[1].textContent = num - 5
    }
}

loadCharacters(API_URL)
