//Imports
const express = require("express");
const app = express();
const compression = require("compression")
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
require("dotenv").config();
const loginRouter = require("./src/routes/loginRoutes");
const setorRouter = require("./src/routes/setorRoutes")
const rondaRouter = require("./src/routes/rondaRoutes");
const rotaRouter = require("./src/routes/rotaRoutes");
const localRouter = require("./src/routes/localRoutes");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const config = require("./swagger.json");
const cors = require("cors");
const geralRouter = require("./src/routes/geralRoutes");
//Configurações
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

app.use(compression())


app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "cdn.jsdelivr.net"],
    },
  }),
);

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

app.use(limiter);



// app.use(express.urlencoded({extended: true}))
//

//Caso for Usar cookies, colocar diretamente o IP da maquina, se não, só o / já abrange tudo
// app.use(cors({
//   origin: '/',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }))

//Declaração de grupo de rotas
app.get("/", (req, res) => {
  res.send("Esta é a API do projeto: Tijuca Ronda");
});
app.use("/doc", swaggerUi.serve, swaggerUi.setup(config));
app.use("/login", loginRouter);
app.use("/ronda", rondaRouter);
app.use("/rota", rotaRouter);
app.use("/local", localRouter);
app.use("/geral", geralRouter);
app.use("/setor", setorRouter);
app.listen(process.env.portaApi);

//API TIJUCA RONDAS 2025
