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
      return res.status(200).json({
        auth: true,
        token: token,
        type: users.type,
        plate: users.plate,
        company: users.company
      });
    } else {
      res.status(500).json({ message: "Login inválido!" });
    }
  },
  async verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"];

    console.log("Olá Token" + token);

    if (!token)
      return res
        .status(401)
        .json({ auth: false, message: "No token provided." });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err)
        return res
          .status(500)
          .json({ auth: false, message: "Failed to authenticate token." });

      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  }
};
