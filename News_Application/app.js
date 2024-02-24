import { API_KEY } from './config.js'

const url = "https://newsapi.org/v2/everything?q="



window.addEventListener('load', () => {
    getnews("india")
    document.getElementById('search-txt').value = '';
})


window.loadPage = () => {
    window.location.reload()
    document.getElementById('search-txt').value = '';

}


async function getnews(query) {
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await response.json()
    console.log(data);
    displayNews(data.articles)
}

function displayNews(data) {
    const cardsBox = document.getElementById('cards-box')
    const cardTemplate = document.getElementById('card-template')

    cardsBox.innerHTML = ""

    data.forEach(article => {
        if (!article.urlToImage) return

        const newCard = cardTemplate.content.cloneNode(true)
        dataFill(newCard, article)
        cardsBox.appendChild(newCard)
    });
}

function dataFill(newCard, article) {
    const cardImg = newCard.querySelector('#news-img')
    const cardTitle = newCard.querySelector('#title')
    const cardPublisher = newCard.querySelector('.publisher')
    const cardArticle = newCard.querySelector('#article')

    cardImg.src = article.urlToImage
    cardTitle.innerText = article.title
    cardArticle.innerText = article.description

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })

    cardPublisher.innerText = `${article.source.name} • ${date}`

    newCard.firstElementChild.addEventListener('click', () => window.open(article.url, "_blank"))
}

let currActive = null
window.changeNews = (id) => {
    currActive?.classList.remove('active')
    let currItem = document.getElementById(id)
    currActive = currItem
    currActive.classList.add('active')
    getnews(id)
    document.getElementById('search-txt').value = '';

}

let searchBtn = document.getElementById('btn')
let searchTxt = document.getElementById('search-txt')

searchBtn.addEventListener('click', () => {
    let query = searchTxt.value;
    if (!query) return
    getnews(query);
    currActive.classList.remove('active')
    searchTxt.value = '';
})
