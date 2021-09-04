// Importação de recursos
const express = require("express");
const router = express.Router();

//Definição de rotas
router.get("/categories",(rez,res)=>{
    res.send("rota de categorias")
});

router.get("/admin/categories/new",(req,res)=>{
    res.send("Rota para criar  uma nova categorias")
});

module.exports = router;