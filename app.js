// FUNCIONANDO#1
// const express = require('express');
// const rotas = require('./rotas');
// const app = require('./express')
// const app = express();
// app.use('/', rotas);

// app.listen(8080, () => {
//     console.log("Server em http://localhost:8080/");
// })

// FUNCIONANDO#2
const rotas = require('./rotas');
const app = require('./express')
const bodyParser = require('body-parser')
const moment = require('moment')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const handlebars  = require('express-handlebars');

// app.engine('handlebars', handlebars({
//     defaultLayout: 'main'}));

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY')
        }
    }
}))
app.set('view engine', 'handlebars')

// Rotas
// Essas rotas dependem do file "rotas.js"
app.use('/', rotas);
app.use('/home', rotas);
app.use('/listar-posts', rotas);
app.use('/criar-post', rotas);
app.use('/gravar-post', rotas); // vai receber tanto do criar quanto do editar
app.use('/editar-post', rotas);
app.use('/apagar-post', rotas);
app.use('/alterar-post', rotas);
// Server
app.listen(8080, () => {
    console.log("Server em http://localhost:8080/");
})
