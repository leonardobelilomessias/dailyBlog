//Importação de recursos
const express = require("express");
const router = express.Router(); 
const Category = require("../categories/Category")



//Definição de rotas
router.get("/article",(req,res)=>{
    res.send("Meus artigos! aqui")
});

router.get("/admin/articles/new",(req,res)=>{
    Category.findAll().then(categories=>{
        res.render("admin/articles/new",{categories:categories})
    })
    
})

   
module.exports = router;