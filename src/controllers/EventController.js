const Event = require("../models/Event");
const File = require("../models/File");
const XLSX = require("xlsx");

module.exports = {
  async index(req, res) {
    const events = await Event.find();

    res.json(events);
  },

  async store(req, res) {
    const { filename } = req.file;
    /*const events = [];

    await File.create({
      file: filename
    });*/

    const workbook = XLSX.readFile(`uploads/${filename}`);
    const sheet_name_list = workbook.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );

    const xlDataObj = xlData[0];

    const xlDataString = Object.keys(xlDataObj)[0];

    const position = xlDataString.length - 15;

    console.log(xlDataString.substr(position));

    var dataAtual = new Date();
    var dia = dataAtual.getDate();
    var mes = dataAtual.getMonth() + 1;
    var ano = dataAtual.getFullYear();
    var horas = dataAtual.getHours();
    var minutos = dataAtual.getMinutes();
    console.log(
      "Hoje é dia " +
        dia +
        "/" +
        mes +
        " de " +
        ano +
        ". Agora são " +
        horas +
        ":" +
        minutos +
        "h."
    );

    /*for (let i = 0; i < xlData.length; i++) {
      const event = await Event.create({
        driver: xlData[i].__EMPTY_1,
        average: xlData[i].__EMPTY_3
      });

      events.push(event);
    }

    return res.send(events);*/
  }
};
