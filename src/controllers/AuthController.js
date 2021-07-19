const User = require("../models/User");
require("dotenv-safe").config();
const jwt = require("jsonwebtoken");

module.exports = {
  async authentication(req, res) {
    try {
      const users = await User.find();
      if (req.body.user === users.name && req.body.password) {
        //auth ok
        const id = users._id; //esse id vem do banco de dados
        const token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 300 // expires in 5min
        });
        return res.json({ auth: true, token: token, type: users.type });
      } else {
        res.status(500).json({ message: "Login inválido!" });
      }
    } catch (error) {
      res.status(500).send(`Erro ao salvar usuário: ${error}`);
    }
  }
};
