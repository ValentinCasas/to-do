
const { ListaItems, Item } = require("../models");

exports.gestionListas = async (req, res) => {
    const listas = await ListaItems.findAll();
    res.render("gestionListas", { listas: listas });

}

exports.editarCategoria = async (req, res) => {
    const { categoria, id } = req.body
    const lista = await ListaItems.update({ categoria: categoria }, { where: { id: id } })
    res.redirect("/admin/gestionListas")
}

exports.irALista = async function (req, res) {
    const id = req.params.id;
    const lista = await ListaItems.findByPk(id, { include: Item });
    const items = await Item.findAll({ where: { listaId: lista.id } });
    res.render("editarTodasListas", { lista: lista, items: items, });
};