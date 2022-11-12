const express = require("express");
var router = express.Router();
const todoController = require("../controllers/lista");

router.post('/agregarLista',todoController.agregarLista);
router.delete('/lista/:id',todoController.borrarLista); //borra la lista siempre y cuando no tenga items o este resuelta
router.get('/titulo/:id/lista',todoController.mostrarEnLista); //la de determinado item
router.put('/listas',todoController.eliminarItemDeLista);
router.post('/enlistar/item',todoController.enlistarTarea); //le asigna una lista a la tarea
router.get('/:id/lista',todoController.irALista); // te lleva a la vista detalle Lista
router.put('/editar/lista',todoController.editarLista);


module.exports = router;