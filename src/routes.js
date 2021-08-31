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

//Rote Logout
routes.post("/logout", function (req, res) {
  res.json({ auth: false, token: null });
});

//Rote Users
routes.get("/user", UserController.search);
routes.get("/user/driver", UserController.index);
routes.post("/user", UserController.addUser);

//Rote Event
routes.get("/event", EventController.allEvents);
routes.get("/event/driver", EventController.index);
routes.post("/event", upload.single("file"), EventController.store);

module.exports = routes;
