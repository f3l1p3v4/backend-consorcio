const Event = require("../models/Event");
const XLSX = require("xlsx");

module.exports = {
  async index(req, res) {
    const files = await Event.find();

    let lastFile = files.slice(-1);

    const workbook = XLSX.readFile('app/uploads/Telemetria-1627264952634.xlsx');
    const sheet_name_list = workbook.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );

    res.json(xlData);
  },

  async store(req, res) {
    const { filename } = req.file;

    const event = await Event.create({
      thumbnail: filename
    });

    return res.json(req.file);
  }
};
