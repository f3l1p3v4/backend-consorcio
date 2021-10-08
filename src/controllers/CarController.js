"use strict";

const Car = require("../models/Car");

module.exports = {
  async searchAll(req, res) {
    const car = await Car.find();

    return res.json(car);
  },

  async searchSector(req, res) {
    const { sector } = req.headers;

    const carSector = await Car.find({ sector });

    return res.json(carSector);
  },

  async searchLiberated(req, res) {
    const { liberated } = req.headers;

    const carLiberated = await Car.find({ liberated });

    return res.json(carLiberated);
  },

  async add(req, res) {
    try {
      const car = await Car.create(req.body);

      console.log(car.car);

      return res.send({
        car
      });
    } catch (error) {
      res.status(500).send(`Erro ao salvar onibûs: ${error}`);
    }
  },

  async change(req, res) {
    try {
      let busEdit = req.body;
      res.status(200).json(await Car.findByIdAndUpdate(busEdit._id, busEdit));
    } catch (error) {
      res.status(500).send(`Erro ao editar o usuário: ${error}`);
    }
  },

  async changeStatus(req, res) {
    try {
      let busEdit = req.body;
      res.status(200).json(await Car.findByIdAndUpdate(busEdit._id, busEdit));
    } catch (error) {
      res.status(500).send(`Erro ao editar o usuário: ${error}`);
    }
  },

  async delete(req, res) {
    try {
      let id = req.params.id;
      let objDeletar = {};
      objDeletar._id = id;

      res.status(200).json(await Car.findByIdAndDelete(objDeletar));
    } catch (error) {
      res.status(500).send(`Erro ao remover usuário: ${error}`);
    }
  }
};
