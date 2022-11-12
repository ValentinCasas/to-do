const { Item, ListaItems } = require("../models");
const mysql = require("mysql2");

const coneccion = mysql.createConnection({
    host: "localhost",
    database: "to-do",
    user: "root",
    password: "",
});

/* post '/' */
exports.agregarLista = async function (req, res) {
    const tiempoTranscurrido = Date.now();
    const fechaCreacion = new Date(tiempoTranscurrido);
    fechaCreacion.toLocaleDateString();
    let fechaResolucion = "";

    const { titulo, estado, categoria, userId } = req.body;

    if (estado == "resuelta") {
        fechaResolucion = fechaCreacion;
    } else {
        fechaResolucion = "0000-00-00";
    }


    await ListaItems.create({
        titulo: titulo,
        fechaCreacion: fechaCreacion,
        fechaResolucion: fechaResolucion,
        estado: estado,
        categoria: categoria,
        userId: userId,
    })

    res.redirect("/todo");

};

/* delete "/lista/:id"   La lista puede eliminarse siempre y cuando no tenga items o esté resuelta  */
exports.borrarLista = async function (req, res) {
    const lista = await ListaItems.findByPk(req.params.id, { include: Item });
    const item = await Item.findAll({ where: { listaId: req.params.id } });

    if (lista.estado == "resuelta" || item.length == 0) {
        ListaItems.destroy({ where: { id: req.params.id } })
        res.redirect("/todo")
    } else {
        console.log("no se puede eliminar")
        res.redirect("/todo")
    }

};

/*  get "/titulo/:id/lista" (lista en la que esta dicho item) */
exports.mostrarEnLista = async function (req, res) {
    const item = await Item.findByPk(req.params.id, { include: ListaItems });
    const lista = await ListaItems.findAll({ where: { id: item.listaId } });
    /* const lista2 = await ListaItems.findAll({ where: { titulo: "lista numero 1" } }); */
    res.render("listas", { listas: lista, item: item, });
};


/*  put '/editar'*/
exports.eliminarItemDeLista = async function (req, res) {
    const result = await Item.update({ listaId: "NULL" }, { where: { id: req.body.id } });
    if (result[0] == 1) {
        res.redirect("/todo");
    }
};

/*  get `todo/id/lista` */
exports.irALista = async function (req, res) {
    const id = req.params.id;
    const lista = await ListaItems.findByPk(id, { include: Item });
    const items = await Item.findAll({ where: { listaId: lista.id } });
    res.render("listaDetalle", { lista: lista, items: items, });
};


/* put "/editar/lista" */
exports.editarLista = async function (req, res) {
    const id = req.body.id;
    const estado = req.body.estado;
    const item = await ListaItems.findByPk(id);

    const tiempoTranscurrido = Date.now();
    const fechaResolucion = new Date(tiempoTranscurrido);
    fechaResolucion.toLocaleDateString()

    if (item.estado != 'resuelta') {
        if (estado == "resuelta") {
            result = await ListaItems.update({ fechaResolucion }, { where: { id: id } });
        }
        result = await ListaItems.update({ estado }, { where: { id: id } });
    } else {
        console.log("NO SE PUEDE EDITAR");
    }
    res.redirect("/todo");
};


/* post '/enlistar/tarea' */
exports.enlistarTarea = async function (req, res) {
    const { idItem, idLista } = req.body;

    const result = await Item.update({ listaId: idLista }, { where: { id: idItem } });

        res.redirect("/todo");

}