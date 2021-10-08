"use strict";

const User = require("../models/User");

module.exports = {
  async searchAll(req, res) {
    const users = await User.find();

    return res.json(users);
  },

  async searchCompany(req, res) {
    const { company } = req.headers;

    let re = new RegExp(`${company}[0-9]?`, "i");

    const userCompany = await User.find({ company: { $regex: re } });

    return res.json(userCompany);
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
