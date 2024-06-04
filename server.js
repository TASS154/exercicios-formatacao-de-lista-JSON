const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const port = 3001

const filmesPath = path.join(__dirname, 'filmes.json')
const filmesData = fs.readFileSync(filmesPath, 'utf-8')
const filmes = JSON.parse(filmesData);

function criarCard(filme) {
    return `
    <div class="card mb-3">
        <img src="${filme.cartaz}" class="card-img-top " alt="${filme.nome}" width: 100px height: 100px>
        <div class="card-body">
            <h5 class="card-title">${filme.titulo}</h5>
            <p class="card-text">${filme.diretor}</p>
            <p class="card-text">${filme.genero}</p>
            <p class="card-text">${filme.ano}</p>
        </div>
        `;
}

app.get('/', (req, res) => {
    const cardsHtml = filmes.map(filme => criarCard(filme)).join('');
    const pageHtmlPath = path.join(__dirname, 'dadosfilme.html');
    let pageHtml = fs.readFileSync(pageHtmlPath, 'utf-8')
    pageHtml = pageHtml.replace('{{cardsHtml}}', cardsHtml);
    res.send(pageHtml);
});

app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});