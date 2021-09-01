"use strict";

const User = require("../models/User");

module.exports = {
  async search(req, res) {
    const users = await User.find();

    return res.json(users);
  },

  async index(req, res) {
    const { driver } = req.headers;

    let re = new RegExp(`${driver}[0-9]?`, "i");

    const user = await User.find({ company: { $regex: re } });

    return res.json(user);
  },

  async addUser(req, res) {
    try {
      const user = await User.findOne({
        plate: req.body.plate
      });

      console.log(user);

      if (user === null) {
        const user = await User.create(req.body);

        return res.send({
          user
        });
      } else {
        return res
          .status(400)
          .send(`Este usuário já está cadastrado no banco de dados!`);
      }
    } catch (error) {
      return res.status(500).send(`Erro ao salvar usuário: ${error}`);
    }
  }
};
