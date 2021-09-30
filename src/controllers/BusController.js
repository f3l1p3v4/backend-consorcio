"use strict";

const Bus = require("../models/Bus");

module.exports = {
  async search(req, res) {
    const bus = await Bus.find();

    return res.json(bus);
  },
  async searchBushes(req, res) {
    const { categorie } = req.headers;

    const bus = await Bus.find({ categorie });

    return res.json(bus);
  },
  async addBushes(req, res) {
    try {
      const bus = await Bus.create(req.body);

      console.log(bus.bus);

      return res.send({
        bus
      });
    } catch (error) {
      res.status(500).send(`Erro ao salvar onibûs: ${error}`);
    }
  },
  async changeStatus(req, res) {
    try {
      let busEdit = req.body;
      res.status(200).json(await Bus.findByIdAndUpdate(busEdit._id, busEdit));
    } catch (error) {
      res.status(500).send(`Erro ao editar o usuário: ${error}`);
    }
  },
  async changeBus(req, res) {
    try {
      let busEdit = req.body;
      res.status(200).json(await Bus.findByIdAndUpdate(busEdit._id, busEdit));
    } catch (error) {
      res.status(500).send(`Erro ao editar o usuário: ${error}`);
    }
  },
  async deleteBus(req, res) {
    try {
      let id = req.params.id;
      let objDeletar = {};
      objDeletar._id = id;

      res.status(200).json(await Bus.findByIdAndDelete(objDeletar));
    } catch (error) {
      res.status(500).send(`Erro ao remover usuário: ${error}`);
    }
  }
};
