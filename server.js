const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const port = 3001

const filmesPath = path.join(__dirname, 'filmes.json');
const filmesData = fs.readFileSync(filmesPath, 'utf-8');
const filmes = JSON.parse(filmesData);

app.get('/', (req, res) => {
    let carsTable = ''; 

    filmes.forEach(filme => {


        carsTable += `
        <tr>
            <td>${filme.titulo}</td>
            <td>${filme.genero}</td>
            <td>${filme.ano}</td>
            <td><img src="${filme.cartaz}" alt="${filme.nome}" style="max-width: 100px;"></td>
        </tr>
        `;
    });

    const htmlContent = fs.readFileSync('dadosfilme.html', 'utf-8');
    const finalHtml  = htmlContent.replace('{{carsTable}}', carsTable);

    res.send(finalHtml);
});

app.listen(port, () =>{
    console.log(`Servidor iniciado em: http://localhost:${port}`)
})