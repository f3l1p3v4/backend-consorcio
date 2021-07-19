"use strict";

const User = require("../models/User");

module.exports = {
  async authentication(req, res) {
    try {
      const bus = await User.create(req.body);

      console.log(bus.bus);

      return res.send({
        bus
      });
    } catch (error) {
      res.status(500).send(`Erro ao salvar onibûs: ${error}`);
    }
  }

  /* if (req.body.user === "Felipe" && req.body.password === "123") {
      //auth ok
      const id = 1; //esse id viria do banco de dados
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      return res.json({ auth: true, token: token, type: "admin" });
    } else if (req.body.user === "motorista" && req.body.password === "123") {
      const id = 1; //esse id viria do banco de dados
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
  
      return res.json({ auth: true, token: token, type: "motorista" });
    } else {
      res.status(500).json({ message: "Login inválido!" + req.body.user });
    }
  });*/
};
