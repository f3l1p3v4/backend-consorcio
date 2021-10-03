const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

const { verifyJWT } = require("./controllers/AuthController");
const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");
const EventController = require("./controllers/EventController");
const BusController = require("./controllers/BusController");

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
routes.get("/user", verifyJWT, UserController.search);
routes.get("/user/driver", UserController.index);
routes.post("/user", UserController.addUser);

//Rote Event
routes.get("/event", EventController.allEvents);
routes.get("/event/driver", EventController.index);
routes.get("/event/company", EventController.indexCompany);
routes.get("/event/date", EventController.indexDateCompany);
routes.post("/event", upload.single("file"), EventController.saveFileXlsx);

//Rote Bushes
routes.get("/all", BusController.search);
routes.get("/bushes", BusController.searchBushes);
routes.post("/bushes", BusController.addBushes);
routes.put("/bushes", BusController.changeStatus);
routes.put("/bus", BusController.changeBus);
routes.delete("/bushes/:id", BusController.deleteBus);

module.exports = routes;
