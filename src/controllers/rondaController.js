
const Service = require("../services/rondaService");
const rondaService = new Service();
const FormData = require('form-data');
const axios = require('axios');
const fs = require("fs");
const sharṕ = require("sharp");
const sharp = require("sharp");

const rondaCreateAndReturnController = async (req, res, next) => {
  const fresult = await rondaService.gerarRetornarRondas();
  // console.log(fresult);
  res.send(fresult);
};

const rondaIniciarController = async (req, res, next) => {
  const dados = req.body;
  const fresult = await rondaService.iniciarRonda(
    dados.idRonda
  );
  if (fresult) {
    res.status(200).send(fresult);
  } else {
    res.status(400).send({
      success: false,
      msg: "Ronda já iniciada",
    });
  }
};

const rondaStopController = async (req, res, next) => {
  const dados = await req.body;

  const filesUpload = req.files; // multer output

  console.log(filesUpload)

  const formData = new FormData({maxDataSize: 5097152});

  await filesUpload.forEach(async file => {

    let compressedBuffer = await sharp(file.buffer).jpeg({ quality: 1 }).toBuffer();
    // console.log(compressedBuffer)

    await formData.append(file.originalname, compressedBuffer, {
      filename: file.originalname,
      contentType: "image/jpeg",
    });

  });


    

    // const response = await axios.post('http://192.168.9.249:5050/index.php', formData, {
    //   headers: formData.getHeaders(),
    // });

    // console.log(response.data);



  // console.log(response.data);




  // const filesUpload = await req.files


  //   const formData = new FormData();


  // filesUpload.forEach(file => {
  //   formData.append(file.fileName, file);
  // });


  // console.log(filesUpload)
  //   const response = await axios.post("http://192.168.9.249:5050/index.php", formData, {
  //     headers: formData.getHeaders() })
  //     console.log(response.data)


  //   console.log("Resposta do PHP:");
  //   console.log(response.data);
  // } catch (err) {
  //   console.error("Erro ao enviar arquivos:", err.message);
  //   if (err.response) {
  //     console.error("Resposta do servidor:", err.response.status, err.response.data);
  //   }
  // }



  const fresult = await rondaService.pararRonda(
    dados,
    req.files
  );
  // if (fresult) {
  //   res.status(200).send({
  //     success: true,
  //     msg: "Ronda Concluída",
  //   });
  // } else {
  //   res.status(400).send({
  //     success: false,
  //     msg: "Ronda já encerrada ou erro desconhecido",
  //   });
  // }
};
const rondaReturnLocalsController = async (req, res) => {
  const dados = req.query;
  // console.log(req.query);
  const fresult = await rondaService.retornaLocaisVisitados(dados.idRonda);
  if (fresult.length == 0 || undefined) {
    res.status(400).send({ success: false });
  } else {
    res.status(200).send(fresult);
  }
};
const pesquisarRondaController = async (req, res) => {
  const dados = req.body;
  const fresult = await rondaService.pesquisarRonda(dados);
  fresult.length == 0
    ? res.status(400).send({ success: false })
    : res.status(200).send(fresult);
};
const pesquisarRondaLogsController = async (req, res) => {
  const dados = req.body;
  const fresult = await rondaService.pesquisarRondaLogs(dados.idRonda);
  fresult.length === 0
    ? res.status(400).send({ success: false })
    : res.status(200).send(fresult);
};
const rondaFindAllController = async (req, res) => {
  const dados = req.body;
  const fresult = await rondaService.rondaFindAll(dados.idRonda);
  fresult.length === 0
    ? res.status(400).send({ success: false })
    : res.status(200).send(fresult);
}

const undoRonda = async (req, res) => {
  const dados = req.body
  const fresult = await rondaService.desfazerRonda(dados.idRonda)
  fresult === true
    ? res.status(200).send({ success: true })
    : res.status(400).send({ success: false });
}

module.exports = {
  rondaCreateAndReturnController,
  rondaIniciarController,
  rondaStopController,
  rondaReturnLocalsController,
  pesquisarRondaController,
  pesquisarRondaLogsController,
  rondaFindAllController,
  undoRonda
};
