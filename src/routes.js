const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");
const EventController = require("./controllers/EventController");

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/", function (req, res) {
  res.send("Bem-vindo a API - Consórcio Guaicurus!");
});

//Rote Auth
routes.post("/user/sign_in", AuthController.authentication);

//Rote Users
routes.get("/user", UserController.search);
routes.post("/user", UserController.addUser);

//Rote Event
routes.get("/event", EventController.index);
routes.post("/event", upload.single("thumbnail"), EventController.store);

module.exports = routes;
