import { API_KEY } from './config.js'

const url = "https://newsapi.org/v2/everything?q="



window.addEventListener('load', () => getnews("India"))

async function getnews(query) {
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await response.json()
    console.log(data);
    displayNews(data)
} 