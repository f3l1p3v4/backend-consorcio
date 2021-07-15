const express = require("express");
require("dotenv-safe").config();
const jwt = require("jsonwebtoken");

const routes = express.Router();

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

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

routes.get("/clientes", verifyJWT, (req, res, next) => {
  console.log("Retornou todos clientes!");
  res.json([{ id: 1, nome: "luiz" }]);
});

routes.post("/users/sign_in", (req, res, next) => {
  //esse teste abaixo deve ser feito no seu banco de dados
  console.log(req.body);
  if (req.body.user === "Felipe" && req.body.password === "123") {
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
});

routes.post("/logout", function (req, res) {
  res.json({ auth: false, token: null });
});

module.exports = routes;
