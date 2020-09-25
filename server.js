const config = require('./config/default.config')

const express = require('express');

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./util/swagger.json');

const bodyParser = require('body-parser');
const logger = require("./app/services/logger")
const connection = require("./app/services/mongoose.service")
const path = require('path');

app.set('port', process.env.PORT || config.port);
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

const LeadRouter = require('./app/routes/lead.router');

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());


let router = express.Router();
let leadRouter = LeadRouter.routesConfig(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', [leadRouter]);



app.on('listening', function () {
  logger.info('ok, server is running');
});
app.listen(app.get('port'), function () {
  logger.info('app listening at port %s', config.port);
  console.log('Open http://localhost:3004/api-docs/ to check swagger API docs', config.port);
});

process.on('uncaughtException', function (err) {
  logger.info('index | uncaughtException, Error: ', err)
  process.exit(1)
})