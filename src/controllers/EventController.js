const Event = require("../models/Event");
const XLSX = require("xlsx");

module.exports = {
  async index(req, res) {
    const files = await Event.find();

    let lastFile = files.slice(-1);

    console.log(lastFile);

    const workbook = XLSX.readFile(`uploads/${lastFile[0].file}`);
    const sheet_name_list = workbook.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );

    res.json(xlData);
  },

  async store(req, res) {
    const { filename } = req.file;

    const event = await Event.create({
      file: filename
    });

    return res.json(event);
  }
};
