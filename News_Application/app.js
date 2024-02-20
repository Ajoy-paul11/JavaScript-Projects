import { API_KEY } from './config.js'

const url = "https://newsapi.org/v2/everything?q="



window.addEventListener('load', () => getnews("India"))

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
}