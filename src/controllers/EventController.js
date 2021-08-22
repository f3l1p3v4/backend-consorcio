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

    await File.create({
      file: filename
    });

    const workbook = XLSX.readFile(`uploads/${filename}`);
    const sheet_name_list = workbook.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );

    /* for (let i = 0; i < xlData.length; i++) {
      await Event.create({
        driver: xlData[i].__EMPTY_1,
        average: xlData[i].__EMPTY_3
      });
    }*/

    const eventBD = await Event.create({
      events: xlData
    });

    return res.json(eventBD);
  }
};
