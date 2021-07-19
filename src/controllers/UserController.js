"use strict";

const User = require("../models/User");

module.exports = {
  async search(req, res) {
    const users = await User.find();

    return res.json(users);
  },

  async addUser(req, res) {
    console.log("ola addUser");
    try {
      const user = await User.create(req.body);

      return res.send({
        user
      });
    } catch (error) {
      res.status(500).send(`Erro ao salvar usuário: ${error}`);
    }
  }
};
