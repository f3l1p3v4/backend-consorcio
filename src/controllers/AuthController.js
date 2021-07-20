const User = require("../models/User");
require("dotenv-safe").config();
const jwt = require("jsonwebtoken");

module.exports = {
  async authentication(req, res) {
    try {
      const users = await User.find();

      for (let i = 0; i < users.length; i++) {
        if (
          req.body.user === users[i].name &&
          req.body.password === users[i].password
        ) {
          //auth ok
          const id = users._id; //esse id vem do banco de dados
          const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
          });
          return res.json({ auth: true, token: token, type: users[i].type });
        } else {
          res.status(500).json({ message: "Login inválido!" });
        }
      }
    } catch (error) {
      res.status(500).send(`Erro ao salvar usuário: ${error}`);
    }
  }
};
