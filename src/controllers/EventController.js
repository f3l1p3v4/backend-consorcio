const Event = require("../models/Event");
const File = require("../models/File");
const XLSX = require("xlsx");

module.exports = {
  async index(req, res) {
    const { driver, date } = req.query;

    let re = new RegExp(`${driver}[0-9]?`, "i");

    const events = await Event.find({
      driver: { $regex: re },
      createdAt: date
    });

    res.json(events);
  },

  async indexCompany(req, res) {
    const { company, date } = req.query;

    const events = await Event.find({
      company: company,
      createdAt: date
    });

    res.json(events);
  },

  /*
    async indexCompany(req, res) {
    const { company } = req.headers;

    let re = new RegExp(`${company}[0-9]?`, "i");

    const events = await Event.find({ company: { $regex: re } });

    res.json(events);
  },*/

  async indexDateCompany(req, res) {
    const { company, date } = req.headers;

    let re = new RegExp(`${company}[0-9]?`, "i");
    let reDate = new RegExp(`${date}[0-9]?`, "i");

    const events = await Event.find({
      company: { $regex: re },
      createdAt: { $regex: reDate }
    });

    res.json(events);
  },

  async allEvents(req, res) {
    const events = await Event.find();

    return res.json(events);
  },

  async saveFileXlsx(req, res) {
    const { filename } = req.file;

    const workbook = XLSX.readFile(`uploads/${filename}`);
    const sheet_name_list = workbook.SheetNames;
    const jsonData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );

    const xlsxCompany = jsonData[1].__EMPTY_2;

    console.log("_" + xlsxCompany + "_");

    if (xlsxCompany === "Jaguar Transportes") {
      const titleString = jsonData[0];

      const titleObj = Object.keys(titleString)[0];

      const positionFirst = titleObj.length - 15;
      const positionLast = titleObj.length - 5;

      const DateFile = titleObj.substring(positionFirst, positionLast);

      console.log("_" + DateFile + "_");

      let yesterday = new Date().setHours(-1);
      yesterday = new Date(yesterday);

      const dateFormated = yesterday.toLocaleDateString("pt-BR");

      if (dateFormated === DateFile) {
        let re = new RegExp(`${dateFormated}[0-9]?`, "i");

        const dateCorrect = await Event.find({
          createdAt: { $regex: re }
        });

        console.log("Retorno do DB" + dateCorrect);

        //Para esta condição funcionar corretamento o banco não pode estar vazio
        if (dateCorrect === []) {
          const events = [];

          await File.create({
            file: filename
          });

          for (let i = 0; i < jsonData.length; i++) {
            const event = await Event.create({
              car: jsonData[i].__EMPTY,
              driver: jsonData[i].__EMPTY_1,
              average: jsonData[i].__EMPTY_3,
              company: "JTU"
            });
            events.push(event);
          }
          return res.status(200).json(events);
        } else {
          return res
            .status(400)
            .json({ message: "Este arquivo já foi salvo no banco de dados!" });
        }
      } else {
        res.status(400).json({ message: "Arquivo com data antiga!" });
      }
    } else {
      res.status(400).json({ message: "arquivo pode ser de outra empresa!" });
    }
  }
};
/*
  --------------------------Trabalhando com datas--------------------------
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

  --------------------------Formatando datas--------------------------
  var hoje = new Date();
  var ontem = new Date().setHours(-1);
  ontem = new Date(ontem) // o comando setHours devolve a data em milisegundos

  var dataformatada = ontem.toLocaleDateString('pt-BR'); // '30/09/2018'
  dataformatada = dataformatada.split('/').reverse().join('') // '20180930'
  var filename = 'LDREL_'+dataformatada+'.txt'

  console.log(filename); // LDREL_20180930.txt
*/
