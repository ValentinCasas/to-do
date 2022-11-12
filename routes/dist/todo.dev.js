"use strict";

var express = require('express');

var router = express.Router();

var fs = require("fs");

var _require = require("../models"),
    Item = _require.Item,
    ListaItems = _require.ListaItems;

var mysql = require("mysql2");

var coneccion = mysql.createConnection({
  host: "localhost",
  database: "to-do",
  user: "root",
  password: ""
});
/* listar items */

router.get('/', function _callee(req, res) {
  var items, listas;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Item.findAll());

        case 2:
          items = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(ListaItems.findAll());

        case 5:
          listas = _context.sent;
          res.render("todo", {
            items: items,
            listas: listas
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
/* agregar items */

router.post('/', function _callee2(req, res) {
  var tiempoTranscurrido, fechaCreacion, _req$body, titulo, fechaResolucion, fechaLimite, descripcion, prioridad, estado;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          tiempoTranscurrido = Date.now();
          fechaCreacion = new Date(tiempoTranscurrido);
          fechaCreacion.toLocaleDateString();
          _req$body = req.body, titulo = _req$body.titulo, fechaResolucion = _req$body.fechaResolucion, fechaLimite = _req$body.fechaLimite, descripcion = _req$body.descripcion, prioridad = _req$body.prioridad, estado = _req$body.estado;
          /* const items =  Item.findAll(); */

          _context2.next = 6;
          return regeneratorRuntime.awrap(coneccion.connect(function () {
            coneccion.query("insert into item (titulo,fechaCreacion,fechaResolucion,fechaLimite,descripcion,prioridad,estado) values (?,?,?,?,?,?,?)", [titulo, fechaCreacion, fechaResolucion, fechaLimite, descripcion, prioridad, estado], function (error, result) {
              if (result.affectedRows == 1) {
                res.redirect("todo");
              }
            });
          }));

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
/* muestra la lista en la que esta dicho item */

router.get("/titulo/:id/lista", function _callee3(req, res) {
  var item, lista;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Item.findByPk(req.params.id, {
            include: ListaItems
          }));

        case 2:
          item = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(ListaItems.findAll({
            where: {
              id: item.listaId
            }
          }));

        case 5:
          lista = _context3.sent;

          /* const lista2 = await ListaItems.findAll({ where: { titulo: "lista numero 1" } }); */
          res.render("listas", {
            listas: lista,
            item: item
          });

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
});
/* eliminar item */

router["delete"]("/item/:id", function (req, res) {
  var id = req.params.id;
  coneccion.connect(function () {
    coneccion.query("delete from item where id = ".concat(id), function (error, result) {
      if (result.affectedRows == 1) {
        res.redirect("/todo");
      }
    });
  });
});
/* eliminar item de la lista */
//falta borrarlo siempre y cuando...

router.put("/listas", function _callee4(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Item.update({
            listaId: "NULL"
          }, {
            where: {
              id: req.body.id
            }
          }));

        case 2:
          result = _context4.sent;

          if (result[0] == 1) {
            res.redirect("/todo");
          }

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
module.exports = router;