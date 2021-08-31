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

    res.json(user);
  },

  async addUser(req, res) {
    try {
      let re = new RegExp(`${req.body.plate}[0-9]?`, "i");

      const userBD = await User.find({ company: { $regex: re } });

      if (userBD === []) {
        const user = await User.create(req.body);

        return res.send({
          user
        });
      } else {
        res
          .status(400)
          .send(`Este usuário já está cadastrado no banco de dados!`);
      }
    } catch (error) {
      res.status(500).send(`Erro ao salvar usuário: ${error}`);
    }
  }
};
