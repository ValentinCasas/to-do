const express = require("express");
var router = express.Router();
const todoController = require("../controllers/admin");


router.get("/gestionListas",todoController.gestionListas);
router.get('/:id/lista',todoController.irALista);
router.put("/editar/lista/",todoController.editarCategoria);

module.exports = router;