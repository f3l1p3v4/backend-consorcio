const Event = require("../models/Event");
const XLSX = require("xlsx");

module.exports = {
  async index(req, res) {
    const workbook = XLSX.readFile("uploads/telemetryData-1626718130674.xlsx");
    const sheet_name_list = workbook.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );

    res.json(xlData);
  },

  async store(req, res) {
    console.log("teste");
    const doc = req.file;

    const event = await Event.create({
      doc: doc
    });

    return res.json(event);
  }
};
