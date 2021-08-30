const User = require("../models/User");
require("dotenv-safe").config();
const jwt = require("jsonwebtoken");

module.exports = {
  async authentication(req, res) {
    const users = await User.findOne({
      plate: req.body.plate,
      password: req.body.password
    });

    if (users != null) {
      //auth ok
      const id = users._id; //esse id vem do banco de dados
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      return res
        .status(200)
        .json({ auth: true, token: token, type: users.type });
    } else {
      res.status(500).json({ message: "Login inválido!" });
    }
  }
};
