// Importaçoes de recursos
const express = require("express");
const app = express();
const bodyParser = require("body-parser");0
const connection = require("./database/database");
const categoriesControle = require("./categories/categories.controle");
const articlesControle = require("./articles/articles.controles");
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const usersControle = require("./user/Users.controle.js");
const session = require("express-session")


//Definição de template engine
app.set('view engine', 'ejs');
app.use(session({
    secret:"kakscbeq4141qw2c",cookie:{maxAge:3000000}
}))
//Utilização do bodyparser(coletar dados via corpo formulario)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//Utilização recursos estaticos
app.use(express.static('public'))

//Autenticação conexão com banco de dados
connection.authenticate().then(()=>{
    console.log('Conexão feita com sucesso')
}).catch((error)=>{
    console.log(error) 
})


// Chamada de rotas
app.use("/",categoriesControle);
app.use("/",articlesControle);
app.use('/',usersControle)

app.get("/",(req,res)=>{
    Article.findAll({
        order:[['id', 'DESC']],
        limit:8
    }).then((articles)=>{
        Category.findAll().then(categories =>{
            res.render("index",{articles:articles,categories:categories});
        })
        
    })
    
});



app.get("/category/:slug",(req,res)=>{
    let slug = req.params.slug
    Category.findOne({
        where:{
            slug:slug
        },include:[{model:Article}]
    }).then(category=>{
        if (category != undefined){
           Category.findAll().then(categories=>{
               res.render("index",{articles:category.articles, categories:categories})
           })
        }else{
            res.redirect("/")
        }
    }).catch(err=>{
        res.redirect("/")
    })
})

app.get("/session",(req,res)=>{
    req.session.nome = 'Leonardo'
    req.session.idade =30
    req.session.profissao = 'programador'
    res.send('sessão gerda')

})
app.get("/leitura",(req,res)=>{
    res.json({
        nome:req.session.nome,
        idade:req.session.idade,
        profissao: req.session.profissao
    })

})

app.get("/:slug",(req,res)=>{
    let slug = req.params.slug
    Article.findOne({
        where:{slug:slug}
    }).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories =>{
                res.render("article",{article:article,categories:categories});
            })
        }else{
            res.redirect(`/${slug}`)
        }
    }).catch(err =>{
        res.redirect("/")
    })

})
// Abertura servidor
app.listen(8080,()=>{
    console.log("servidor funcionado.")
})
