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
    const processedFiles = [];
    
      for (const file of filesUpload) {
      // Mantém o nome original
      const outputPath = path.join(uploadDir, file.originalname);

      // Faz a compressão e salva
      await sharp(file.buffer)
        .jpeg({ quality: 50 })
        .toFile(outputPath);

      processedFiles.push({
        originalName: file.originalname,
        path: `/uploads/${file.originalname}`,
        sizeKB: (file.size / 1024).toFixed(2),
        compressed: true,
      });
    }

    try{
      const fresult = await this.rondaQueriesL.encerraRonda(data);
      return fresult

    }catch(e){
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
