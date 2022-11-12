const express = require("express");
var router = express.Router();
const todoController = require("../controllers/item");


router.get('/',todoController.listarItem);
router.post('/',todoController.agregarItem);
router.delete('/item/:id',todoController.borrarItem);
router.get('/titulo/:id/editar',todoController.irAEditar);
router.put('/editar',todoController.editarItem);

module.exports = router;