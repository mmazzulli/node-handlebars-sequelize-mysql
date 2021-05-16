
// FUNCIONANDO#1

// const express = require('express');
// const router = express.Router();
// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });
// define the home page route
// router.get('/', (req,res) => {
//     res.send("<h2>Você está na página home.</h2>");
// });
// define the about route
// router.get('/about', function(req, res) {
//   res.send('About birds');
// });

// module.exports = router;

//FUNCIONANDO#2
const express = require('express');
const router = express.Router();
const Posts = require('./models/Posts')


// define the home page route
router.get('/', (req,res) => {
    res.render('home');
});

router.get('/criar-post', (req,res) => {
    res.render('criar-post');
});

router.post('/gravar-post', function(req, res){
    Posts.create({
        titulo: req.body.titlepost,
        conteudo: req.body.contentpost
    }).then(function(){
        // res.redirect('/pagamento')
        res.send("Post inserido com sucesso!")
    }).catch(function(erro){
        res.send("Erro: O post não pode ser cadastrado!" + erro)
    })
    //res.send("Nome: " + req.body.nome + "<br>Valor: " + req.body.valor + "<br>") 
})

router.get('/listar-posts', function(req, res){
    Posts.findAll({order: [['id', 'DESC']]}).then(function(posts){
        res.render('listar-posts', {posts: posts});
    })
});

router.get('/editar-post/:id', (req,res) => {
   Posts.findByPk(req.params.id).then(function(post){
       res.render('editar-post', {post: post});
   }).catch(function(erro){
       res.send("Não foi possível acessar este registro.");
   });
});

// router.post('/alterar-post', function (req, res) {
    // var identificacao = req.params.id;
    // Posts.update({
    //   titulo: req.body.titlepost,
    //   conteudo: req.body.contentpost, 
    //   where: {'id': identificacao}
    // })
//     Posts.update({
//         titulo: req.body.titlepost, 
//         where : {'id' : req.params.id } })
//     .then(function() {
//         res.send("Registro alterado com sucesso.");
//     }).catch(function(erro){
//     res.send("Não foi possível acessar este registro.");
//     })
//    });


router.post('/alterar-post', function (req, res) {
    var eventid = req.body.id;
    var title = req.body.titlepost;    
    var description = req.body.contentpost;
    // var date = req.body.date;
   console.log("ID: " + eventid); //this returns undefined.
   console.log("Titulo: " + title);
   console.log("Conteúdo: " + description);

   const newData = {  
      titulo: title,
        conteudo: description
   };
 
     Posts.update(
     newData,
       {    
       where:{
         'id': eventid
         }
        }
   ).then(function() {
            res.send("Registro alterado com sucesso.");
        }).catch(function(erro){
            res.send("Não foi possível acessar este registro.");
        })
       });

router.get('/apagar-post/:id', function(req, res){
    Posts.destroy({
        where: {'id': req.params.id}
    }).then(function(){
        res.redirect('/listar-posts');
        // console.log("Registro apagado: " + id)
        /*res.send("Pagamento apagado com sucesso!");*/
    }).catch(function(erro){
        res.send("Pagamento não apagado com sucesso!");
    })
});

module.exports = router;