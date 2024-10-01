const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

const app = express();

const routes = require('./routes/index');
const { errorHandler, notFoundError} = require('./middlewares/errors/errorHandler');



// Cors usado dsp para conectar react
app.use(cors());
// logear server
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.use(errorHandler);
app.use(notFoundError);
app.use(bodyParser.urlencoded({ extended: true }));

// // Socket
// const http = require('http')
// const server = http.createServer(app);
// const io = new http.Server(server);

// // Funcionalidad Chat

// const returnRouter = (io) => {
//     routes.get("/", (req, res, next) => {
//         console.log(res)
//     });

// }


module.exports = app;
// module.exports = returnRouter;