const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const database = require('./util/database');
const rutasCimarron = require('./routes/cimarron');
const rutasAuth = require('./routes/auth');

const app = express();

//Stream de escritura para hacer logging.
const accessLogStream = fs.createWriteStream(
  path.join(__dirname + '/iisnode', 'access.log'),
  { flags: 'a' }
);

//Middleware para hacer mas rapida la comunicacion y mas segura
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(morgan('combined', { stream: accessLogStream }));

//Activar Cors, esto se hace tanto aqui en codigo y en el Web.Config
app.options('/', cors());

//Aqui van las rutas y la direccion que tendran que poner para llegar a este servicio.
app.use('/', rutasCimarron);
app.use('/auth', rutasAuth);

//Middleware para cachar errores y mandarlos al usuario final.
app.use((err, req, res, next) => {
  if (err.isServer) {
    console.log(err);
  }
  res.status(err.output.statusCode).json(err.output.payload);
});

//I
database
  .sync()
  .then((result) => {
    app.listen(process.env.PORT || 3535);
  })
  .catch((err) => {
    console.error('error', err);
  });
