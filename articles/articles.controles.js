//Importação de recursos
const express = require("express");
const router = express.Router();

//Definição de rotas
router.get("/article",(req,res)=>{
    res.send("Meus artigos! aqui")
});

router.get("/article/new",(req,res)=>{
    res.send("Novo artigo")
})

module.exports = router;