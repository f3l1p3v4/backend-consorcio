const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

const { verifyJWT } = require("./controllers/AuthController");
const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");
const EventController = require("./controllers/EventController");
const CarController = require("./controllers/CarController");

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
routes.get("/user", verifyJWT, UserController.searchAll);
routes.get("/user/company", verifyJWT, UserController.searchCompany);
routes.post("/user", UserController.addUser);

//Rote Event
routes.get("/event", EventController.allEvents);
routes.get("/event/driver", EventController.index);
routes.get("/event/company", EventController.indexCompany);
routes.get("/event/date", EventController.indexDateCompany);
routes.post("/event", upload.single("file"), EventController.saveFileXlsx);

//Rote Car
routes.get("/car", CarController.searchAll);
routes.get("/car/sector", CarController.searchSector);
routes.get("/car/liberated", CarController.searchLiberated);
routes.post("/car", CarController.add);
routes.put("/car", CarController.change);
routes.put("/car/status", CarController.changeStatus);
routes.delete("/car/:id", CarController.delete);

module.exports = routes;
