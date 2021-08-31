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

    const user = await User.find({ driver: { $regex: re } });

    res.json(user);
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
