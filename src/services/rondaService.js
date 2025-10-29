const { default: axios } = require("axios");
const FormData = require('form-data');
const rondaQueries = require("../repositories/rondaReposity");
const sharp = require("sharp")
require("dotenv").config();
const formDataToJSON = require("../utils/formDataToJSON")
class rondaService {
  rondaQueriesL = new rondaQueries();

  constructor() { }
  async gerarRetornarRondas() {
    try {
      const fresult = await this.rondaQueriesL.gerarRetornar();
      // console.log(fresult);
      return fresult;
    } catch (e) { }
  }
  async iniciarRonda(idRonda) {
    try {
      const fresult = await this.rondaQueriesL.iniciarRonda(idRonda);
      return fresult;
    } catch (E) {
      console.log(E);
      return false;
    }
  }

  async pararRonda(data, filesUpload) {
    
    const formData = new FormData({ maxDataSize: 5097152 });

    for (let i = 0; i <= filesUpload.length - 1; i++) {

      let compressedBuffer = await sharp(filesUpload[i].buffer).jpeg({ quality: 50 }).toBuffer();

      formData.append(filesUpload[i].originalname, compressedBuffer, {
        filename: filesUpload[i].originalname,
        contentType: "image/jpeg",
      });
    }

    const response = await axios.post(`http://${process.env.ipBase}:5050/index.php`, formData, {
      headers: formData.getHeaders(),
    });

    let jsonParse = response.data

    if (jsonParse.success) {
      const fresult = await this.rondaQueriesL.encerraRonda(data);
      return fresult

    }
    else {
      return false
    }


  }

  async retornaLocaisVisitados(idRonda) {
    try {
      const fresult = await this.rondaQueriesL.retornaLocaisVisitados(idRonda);
      return fresult;
    } catch (e) {
      console.log(e);
    }
  }

  async pesquisarRonda(dados) {
    const fresult = await this.rondaQueriesL.pesquisarRonda(dados);
    return fresult;
  }

  async pesquisarRondaLogs(idRonda) {
    const fresult = await this.rondaQueriesL.pesquisarRondaLogs(idRonda);
    return fresult;
  }

  async rondaFindAll() {
    const fresult = await this.rondaQueriesL.returnAll();
    return fresult;
  }

  async desfazerRonda(idRonda) {
    const fresult = await this.rondaQueriesL.desfazerRota(idRonda);
    return fresult;
  }
}
module.exports = rondaService;
